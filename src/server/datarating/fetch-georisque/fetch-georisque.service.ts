import { Injectable } from '@nestjs/common';
import { getCoordinatesAsString } from '@server/datarating/fetch-address/addressFunction';
import { AddressObject } from '@server/datarating/fetch-address/address';
import { delay, filterObjectKeys, sortObject } from '@server/datarating/utilities';
import {
  AZIAnalysis,
  CATNATAnalysis,
  TRIAnalysis,
  installationClasseAnalysis,
  mvtAnalysis,
  radonAnalysis,
  risqueAnalysis,
  sisAnalysis,
  sysmiqueAnalysis,
} from '@server/datarating/fetch-georisque/georisqueAnalysis';
import { GeorisqueAllData, RatesGeoRisque } from '@server/datarating/fetch-georisque/Georisque';
import axios from 'axios';
import { GasprAPIResponse } from './api-georisque';
import { KEYSTOKEEPGEORISQUE } from './api-keysToKeep';

@Injectable()
export class FetchGeorisqueService {
  /*
   *DATASHEET API : https://www.georisques.gouv.fr/doc-api
   * 1000call/min
   */

  //API Gaspar management, given any valide endepoint return the response
  async apiGaspar(addressObject: AddressObject, endpoint: string, rayon: string) {
    let dataResponse: GasprAPIResponse;
    let data: any = [];
    const URL = 'https://www.georisques.gouv.fr/api/v1/';
    const coordone = getCoordinatesAsString(addressObject);
    let page = 1;
    // TODO: Remove all the keys to keep

    try {
      do {
        const response = await axios.get(
          endpoint.includes('radon')
            ? `${URL}${endpoint}?code_insee=${addressObject.properties.citycode}&page=${page}`
            : `${URL}${endpoint}?latlon=${coordone}&rayon=${rayon}&page=${page.toString()}`,
        );
        dataResponse = response.data;
        data = [...data, ...dataResponse.data]; //Merge the two array
        if (dataResponse.next) {
          page++;
        }
        await delay(250);
      } while (dataResponse.next != null); //Continue untill response is not NULL
      const yearsToInclude = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
      //Filter the data
      let filteredObjects = filterObjectKeys(data, KEYSTOKEEPGEORISQUE);
      if (endpoint == 'gaspar/catnat') {
        filteredObjects = sortObject(filteredObjects, 'date_debut_evt');
        // Filter oldest years
        filteredObjects = filteredObjects.filter((item) => {
          return yearsToInclude.some((year) => item.date_debut_evt.includes(year));
        });
      } else if (endpoint == 'mvt') {
        filteredObjects = sortObject(filteredObjects, 'date_debut');
        // Filter oldest years
        filteredObjects = filteredObjects.filter((item) => {
          return yearsToInclude.some((year) => item.date_debut.includes(year));
        });
      }
      console.log('Finished getting : ' + endpoint + ', at page ' + page);
      return filteredObjects;
    } catch (err) {
      const URLsend = endpoint.includes('radon')
        ? `${URL}${endpoint}?code_insee=${addressObject.properties.citycode}&page=${page}`
        : `${URL}${endpoint}?latlon=${coordone}&rayon=${rayon}&page=${page.toString()}`;
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
      return []; // return an array, maybe later I'll return a error object??
    }
  }

  // TODO: creeer service AXIOS de type
  /*    // @Injectable()
// export class GeoRisqueService {
//   private client: AxiosInstance;

//   constructor() {
//     this.client = axios.create({
//       baseURL: BASE_URL,
//     })
//   }

//   getRadon(){
//     // Tu crées ton type GetRadonResponse
//     // Ici tu peux même itéré sur tes pages si t'as besoin mais déjà t'utilises ton client c'est plus propre et facil à lire
//     const { data } = await this.client.get<GetRadonResponse>('/radon', {
//       params: {
//         code_insee: addressObject.properties.citycode,
//         page:page
//       },
//     });
//   }
// }

*/
  //API Gaspar management, given any valide endepoint return the response
  async callAllApiGasparPromiseAll(addressObject: AddressObject): Promise<GeorisqueAllData> {
    const endpoints = [
      { endpoint: 'gaspar/azi', type: 'AZIData', rayon: '1' },
      { endpoint: 'gaspar/catnat', type: 'CatnatData', rayon: '1' },
      { endpoint: 'installations_classees', type: 'InstallationsClasseesData', rayon: '1000' },
      { endpoint: 'mvt', type: 'MVTData', rayon: '1000' },
      { endpoint: 'radon', type: 'RadonData', rayon: '1' },
      { endpoint: 'gaspar/risques', type: 'RisquesData', rayon: '1' },
      { endpoint: 'sis', type: 'SISData', rayon: '1000' },
      { endpoint: 'gaspar/tri', type: 'TRIData', rayon: '1' },
      { endpoint: 'zonage_sismique', type: 'ZonageSismiqueData', rayon: '1' },
    ];

    // Create an array of API call promises
    const apiCalls = endpoints.map(({ endpoint, type, rayon }) =>
      // Call apiGaspar function for each endpoint
      this.apiGaspar(addressObject, endpoint, rayon).then((data) => ({ [type]: data })),
    );
    // Await the resolution of all API call promises using Promise.all
    const resultsArray = await Promise.all(apiCalls);
    // Combine all resolved objects into a single object
    const results = Object.assign({}, ...resultsArray);

    return results;
  }

  analisysGaspar(dataObject: GeorisqueAllData): RatesGeoRisque {
    const gasparSizes: Record<string, number | undefined> = {};
    const gasparPoints: Record<string, number | undefined> = {};
    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        const element = dataObject[key as keyof GeorisqueAllData];
        gasparSizes[key] = Array.isArray(element) ? element.length : undefined;
        gasparPoints[key] = undefined; //Construc gasparPoints structure for future usage
      }
    }
    // Function call for note managements of each parameters
    gasparPoints.RadonData = radonAnalysis(dataObject.RadonData, gasparSizes.radonData);
    gasparPoints.MVTData = mvtAnalysis(dataObject.MVTData, gasparSizes.mvt);
    gasparPoints.SISData = sisAnalysis(dataObject.SISData, gasparSizes.SISData);
    gasparPoints.TRIData = TRIAnalysis(dataObject.TRIData, gasparSizes.TRIData);
    gasparPoints.AZIData = AZIAnalysis(dataObject.AZIData, gasparSizes.AZIdata);
    gasparPoints.RisquesData = risqueAnalysis(dataObject.RisquesData, gasparSizes.RisquesData);
    gasparPoints.CatnatData = CATNATAnalysis(dataObject.CatnatData, gasparSizes.catnatData);
    gasparPoints.ZonageSismiqueData = sysmiqueAnalysis(
      dataObject.ZonageSismiqueData,
      gasparSizes.zonage_sismique,
    );
    gasparPoints.InstallationsClasseesData = installationClasseAnalysis(
      dataObject.InstallationsClasseesData,
      gasparSizes.installations_classees,
    );
    return gasparPoints;
  }
}
