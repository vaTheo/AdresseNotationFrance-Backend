import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AddressObject } from '../fetch-address/address';
import { ApiResponse, ResultItemDPE } from './api-DPE';
import { filterObjectKeys } from '../utilities';
import { KEYSTOKEEDPE } from './api-keysToKeep';
import { DPEAllData, RatesDPE } from './DPE';

@Injectable()
export class FetchDPE {
  // 100 requêtes/ 5 secondes
  async callDPE(addressObject: AddressObject, endpoint: string): Promise<ResultItemDPE[] | null> {
    try {
      const agg_size = '64'; //Max result in the response
      const URLAPI = `https://data.ademe.fr/data-fair/api/v1/datasets/${endpoint}/`;
      const response = await axios.get(
        `${URLAPI}geo_agg?q=${addressObject.properties.id}&q_fields=Identifiant__BAN&size=50`,
      );
      console.log(`${endpoint} -- callDPE`);
      const data: ApiResponse = response.data;
      if (data.total === 0) {
        return [];
      }
      let filteredObjects = filterObjectKeys(data.aggs[0].results, KEYSTOKEEDPE) as ResultItemDPE[];
      return filteredObjects;
    } catch (error) {
      console.error(`Error fetching data endpoint ${endpoint}`, error);
      throw new HttpException(`Error fetching data endpoint ${endpoint}`, HttpStatus.NOT_FOUND);
      return null;
    }
  }

  async getDPEDatas(addressObject: AddressObject): Promise<DPEAllData> {
    const endpoints = ['dpe-v2-logements-existants', 'dpe-v2-tertiaire-2', 'dpe-v2-logements-neufs','dpe-tertiaire','dpe-france'];
    const DPEDataPromise = endpoints.map((endpoint) => this.callDPE(addressObject, endpoint));
    try {
      const results = await Promise.all(DPEDataPromise);
      return {
        DPEHabitatExistant: results[0],
        DPEHabitatNeuf: results[1],
        DPETertiaire: results[2],
        DPETertiaireAvant2021: results[3],
        DPEHabitatExistantAvant2021: results[4],
      } as DPEAllData;
    } catch (error) {
      console.error('Error fetching nature data:', error);
      // Return an empty object or handle the error as per your application's needs
      return {};
    }
  }

  RateDPE(DPE: ResultItemDPE[]): number {
    // Convert letters to numbers
    if (!DPE || !DPE[0]) {
      return 0;
    }
    const letterToNumber = (letter: string): number => {
      switch (letter) {
        case 'A':
          return 6;
        case 'B':
          return 5;
        case 'C':
          return 4;
        case 'D':
          return 3;
        case 'E':
          return 2;
        case 'F':
          return 1;
        case 'G':
          return 0;
        default:
          return 0; // Adjust default case as needed
      }
    };

    // Calculate average
    const num1 = letterToNumber(DPE[0].Etiquette_GES);
    const num2 = letterToNumber(DPE[0].Etiquette_DPE);
    const average = (num1 + num2) / 2;

    // Map average to a value between 0 and 3
    let rate;
    if (average >= 5) rate = 3; // Closer to 'A'
    else if (average >= 3) rate = 2; // Closer to 'C'
    else if (average >= 1) rate = 1; // Closer to 'E'
    else rate = 0; // Closer to 'G'

    return rate;
  }

  getDPERates(DPEAllData: DPEAllData): RatesDPE {
    return {
      DPEHabitatExistant: this.RateDPE(DPEAllData.DPEHabitatExistant),
      DPEHabitatNeuf: this.RateDPE(DPEAllData.DPEHabitatNeuf),
      DPETertiaire: this.RateDPE(DPEAllData.DPETertiaire),
      DPETertiaireAvant2021: this.RateDPE(DPEAllData.DPETertiaireAvant2021),
      DPEHabitatExistantAvant2021: this.RateDPE(DPEAllData.DPEHabitatExistantAvant2021),
    };
  }
}
