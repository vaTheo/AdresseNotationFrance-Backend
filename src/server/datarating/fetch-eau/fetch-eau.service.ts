import { Injectable } from '@nestjs/common';
import {  ResultatDis } from '@server/datarating/fetch-eau/api-eau';
import { getFormattedDateYearsAgoAsString } from '@server/datarating/fetch-address/addressFunction';
import { AddressObject } from '@server/datarating/fetch-address/address';
import axios from 'axios';
import { EauPotableData } from './eau';

@Injectable()
export class FetchEauService {
  async qualiteEau(adressObject: AddressObject): Promise<ResultatDis> {
    let uniqueCodeReseau: string[] = [];
    let uniqueTypeAnalysis: string[] = [];
    const basURL = 'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/';
    const endpoint = 'resultats_dis';
    //City code managment it appear Hub eau do not manage disctrict
    let cityCode = adressObject.properties.citycode;
    // TODO: Manage city conde des arrondissements des grandes villes 
    const lyonCityCodes = ['69381', '69382', '69383', '69384', '69385', '69386', '69387', '69388', '69389'];
    if (lyonCityCodes.includes(cityCode)) {
      cityCode = '69123';
    }
    const codeCommune = `?code_commune=${cityCode}`;
    const dateMinPrelevement = `&date_min_prelevement=${getFormattedDateYearsAgoAsString(10)}`;

    // Get resultat Dis
    try {
      const response = await axios.get(basURL + endpoint + codeCommune + dateMinPrelevement);
      const resultatDis: ResultatDis = response.data;

      resultatDis.data.forEach((item) => {
        // regroup every code reseau for the city in one array
        if (!uniqueTypeAnalysis.includes(item.libelle_parametre)) {
          uniqueTypeAnalysis.push(item.libelle_parametre);
        }
      });
      type DataItem = {
        libelle_parametre: string;
        // Include other properties as needed
      };

      // Assuming resultatDis.data is an array of DataItem
      const counts: Record<string, number> = {};

      resultatDis.data.forEach((item: DataItem) => {
        const libelle = item.libelle_parametre;

        if (!counts[libelle]) {
          counts[libelle] = 1;
        } else {
          counts[libelle]++;
        }
      });
      return resultatDis;
    } catch (err) {
      const URLsend = basURL + endpoint + codeCommune + dateMinPrelevement;
      const urlErr = `-- URL= ${URL}${URLsend}`;
      if (axios.isAxiosError(err) && err.response?.data) {
        const responseData = err.response.data;
        // Check for known status codes
        if (err.response?.status === 404) {
          console.error(`Resource not found: ${responseData.message} ${urlErr}`);
        } else if (err.response?.status === 410) {
          console.error(`Resource no longer available: ${responseData.message} ${urlErr}`);
        } else {
          console.error(`Unexpected error: ${responseData.message} ${urlErr}`);
        }
      } else {
        console.error(`Non-HTTP error occurred: ${err.message} ${urlErr}`);
      }
    }
  }

  dataCalculation(resultatDis: ResultatDis): EauPotableData[] {
    // Creation of empty data and defining thresholds
    let paramAnalyseEau: EauPotableData[] = [
      {
        libelle_parametre: 'Escherichia coli /100ml - MF',
        min: 0,
        max: 0,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Entérocoques /100ml-MS',
        min: 0,
        max: 0,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Nitrates (en NO3)',
        min: 0,
        max: 50,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Turbidité néphélométrique NFU',
        min: 0,
        max: 1.0,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Conductivité à 25°C',
        min: 200,
        max: 1100,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Ammonium (en NH4)',
        min: 0,
        max: 0.1,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'pH',
        min: 6.5,
        max: 9.0,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Bact. aér. revivifiables à 36°-44h',
        min: 0,
        max: 0,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
      {
        libelle_parametre: 'Plomb',
        min: 0,
        max: 10,
        totalAverage: 0,
        countValue: 0,
        good: false,
      },
    ];
    //Object to keep track of total values and counts for each parameter
    const totals: Record<string, { total: number; count: number }> = {};

    resultatDis.data.forEach((item) => {
      const param = item.libelle_parametre;
      const value = item.resultat_numerique;

      // Initialize the accumulator for this parameter if it's not already there
      if (!totals[param]) {
        totals[param] = { total: 0, count: 0 };
      }

      // Accumulate totals and counts
      totals[param].total += value;
      totals[param].count += 1;
    });

    // Calculate averages and check if they are within the range
    paramAnalyseEau.forEach((param) => {
      const data = totals[param.libelle_parametre];
      if (data) {
        const avg = data.total / data.count;
        param.totalAverage = avg;
        param.good = avg >= param.min && avg <= param.max;
        param.countValue = data.count; // Assigning countValue
      } else {
        param.totalAverage = 0;
        param.good = null;
        param.countValue = 0; // No occurrences found
      }
    });

    return paramAnalyseEau;
  }
}
