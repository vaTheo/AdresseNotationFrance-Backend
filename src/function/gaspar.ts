import { AddressObject } from 'src/interface';
import {
  CatnatData,
  CaviteData,
  GasprAPIResponse,
  AZIData,
  InstallationsClasseesData,
  MVTData,
  PAPIData,
  PCSData,
  RGAResponse,
  RadonData,
  RisquesData,
  SISData,
  TIMData,
  TRIData,
  ZonageSismiqueData,
  GasparAllObject,
} from 'src/function/utilities/Inetface/GeoRisque';

import { getCoordinatesAsString } from './utilities/addressFunction';
import axios, { Axios, AxiosError } from 'axios';
import { delay, filterObjectKeys, parseDateString, sortObject } from './utilities/utilities';

/*
 *DATASHEET API : https://www.georisques.gouv.fr/doc-api
 * 1000call/min
 */
//API Gaspar management, given any valide endepoint return the response
const apiGaspar = async (addressObject: AddressObject, endpoint: string, rayon: string) => {
  let dataResponse: GasprAPIResponse;
  let data: any = [];
  const URL = 'https://www.georisques.gouv.fr/api/v1/';
  const coordone = getCoordinatesAsString(addressObject);
  let page = 1;
  const keysToKeep = [
    'code_national_azi',
    'liste_libelle_risque',
    'libelle_bassin_risques',
    'libelle_commentaire',
    'date_debut_programmation',
    'date_fin_programmation',
    'date_debut_evt',
    'date_fin_evt',
    'libelle_risque_jo',
    'raisonSociale',
    'codeNaf',
    'longitude',
    'latitude',
    'bovins',
    'porcs',
    'volailles',
    'carriere',
    'eolienne',
    'industrie',
    'prioriteNationale',
    'ied',
    'regime',
    'inspections',
    'rubriques',
    'etatActivite',
    'statutSeveso',
    'date_debut',
    'date_debut',
    'fiabilite',
    'commentaire_mvt',
    'classe_potentiel',
    'num_risque',
    'libelle_risque_long',
    'zone_sismicite',
    'fiche_risque',
    'nom',
    'superficie',
    'geom',
    'id_sis',
    'code_zone',
    'risques_detail',
    'date_fin_realisation',
    'libelle_bassin_risques',
    'libelle_commentaire',
    'date_arrete_approbation',
    'date_arrete_carte',
    'date_arrete_national',
    'date_arrete_pcb',
    'date_arrete_prefet_parties_prenantes',
  ];

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
      await delay(500);
    } while (dataResponse.next != null); //Continue untill response is not NULL

    //Filter the data
    let filteredObjects = filterObjectKeys(data, keysToKeep);
    if (endpoint == 'gaspar/catnat') {
      filteredObjects = sortObject(filteredObjects, 'date_debut_evt');
      // Filter oldest years
      filteredObjects = filteredObjects.filter((item) => {
        const yearsToInclude = [
          '2024',
          '2023',
          '2022',
          '2021',
          '2020',
          '2019',
          '2018',
          '2017',
          '2016',
          '2015',
        ];
        return yearsToInclude.some((year) => item.date_debut_evt.includes(year));
      });
    } else if (endpoint == 'mvt') {
      filteredObjects = sortObject(filteredObjects, 'date_debut');
      // Filter oldest years
      filteredObjects = filteredObjects.filter((item) => {
        const yearsToInclude = [
          '2024',
          '2023',
          '2022',
          '2021',
          '2020',
          '2019',
          '2018',
          '2017',
          '2016',
          '2015',
        ];
        return yearsToInclude.some((year) => item.date_debut.includes(year));
      });
    }
    console.log('Finished getting : ' + endpoint);
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
};
//API Gaspar management, given any valide endepoint return the response
export const callAllApiGasparPromiseAll = async (addressObject: AddressObject): Promise<GasparAllObject> => {
  const endpoints = [
    { endpoint: 'gaspar/azi', type: 'AZIData', rayon: '1' /*1*/ },
    { endpoint: 'gaspar/catnat', type: 'CatnatData', rayon: '10000' },
    // { endpoint: 'cavites', type: 'CaviteData', rayon: '10000' },
    { endpoint: 'installations_classees', type: 'InstallationsClasseesData', rayon: '10000' },
    { endpoint: 'mvt', type: 'MVTData', rayon: '100' },
    // { endpoint: 'gaspar/papi', type: 'PAPIData', rayon: '10000' },
    // { endpoint: 'gaspar/pcs', type: 'PCSData', rayon: '10000' },
    { endpoint: 'radon', type: 'RadonData', rayon: '10000' },
    { endpoint: 'gaspar/risques', type: 'RisquesData', rayon: '1' /*1*/ },
    { endpoint: 'sis', type: 'SISData', rayon: '10000' },
    { endpoint: 'gaspar/tri', type: 'TRIData', rayon: '1' },
    { endpoint: 'zonage_sismique', type: 'ZonageSismiqueData', rayon: '1' /*1*/ },
  ];

  // Create an array of API call promises
  const apiCalls = endpoints.map(({ endpoint, type, rayon }) =>
    // Call apiGaspar function for each endpoint
    apiGaspar(addressObject, endpoint, rayon).then((data) => ({ [type]: data })),
  );
  // Await the resolution of all API call promises using Promise.all
  const resultsArray = await Promise.all(apiCalls);
  // Combine all resolved objects into a single object
  const results = Object.assign({}, ...resultsArray);

  return results;
};
const AZIAnalysis = (arrayAZI: AZIData[], numberOccurrences: number): number => {
  //Atlas des zones inondable
  //Find all Num risque
  let allRisqueNumber = arrayAZI.map((item) => {
    return item.liste_libelle_risque[0].num_risque;
  });
  const uniqueRisqueAZI = allRisqueNumber.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  if (allRisqueNumber.length == 0) {
    return 0;
  } else if (allRisqueNumber.length < 1 && uniqueRisqueAZI.length < 1) {
    return 1;
  } else if (allRisqueNumber.length < 2 && uniqueRisqueAZI.length < 2) {
    return 2;
  } else {
    return 3;
  }
};

const sysmiqueAnalysis = (arraySismique: ZonageSismiqueData[], numberOccurrences: number): number => {
  // Zonage Sismique Data Risque = 1-Très faible 2-faible 3-Moderée 4-Moyen 5-Fort
  const risqueLieu = parseInt(arraySismique[0].code_zone);
  if (risqueLieu <= 2) {
    return 0;
  } else if (risqueLieu > 2 && risqueLieu <= 3) {
    return 1;
  } else if (risqueLieu == 4) {
    return 2;
  } else if (risqueLieu == 5) {
    return 3;
  }
};

const CATNATAnalysis = (arrayCATNAT: CatnatData[], numberOccurrences: number): number => {
  if (numberOccurrences == 0) {
    return 0;
  } else if (numberOccurrences == 1) {
    return 1;
  } else if (numberOccurrences < 5) {
    return 2;
  } else {
    return 3;
  }
};

const installationClasseAnalysis = (
  arrayInstallationClasse: InstallationsClasseesData[],
  numberOccurrences: number,
): number => {
  let numberNonSeveso = 0;
  let numberSeveso1 = 0;
  let numberSeveso2 = 0;
  const arrayStatusSeveso = arrayInstallationClasse.map((item) => {
    return item.statutSeveso;
  });
  arrayStatusSeveso.forEach((item) => {
    if (item == 'Non Seveso') {
      numberNonSeveso++;
    } else if (item == 'Seveso seuil bas') {
      numberSeveso1++;
    } else if (item == 'Seveso seuil haut') {
      numberSeveso2++;
    } else {
      console.log('Err installationClasseAnalysis, seveso name not taken into account :' + item);
    }
  });
  if (numberSeveso2 >= 1) {
    return 3;
  } else if (numberSeveso1 >= 1) {
    return 2;
  } else if (numberNonSeveso >= 1) {
    return 1;
  } else {
    return 0;
  }
};
const radonAnalysis = (arrayRadon: RadonData[], numberOccurrences: number): number => {
  if (arrayRadon[0].classe_potentiel == '1') {
    return 0;
  } else if (arrayRadon[0].classe_potentiel == '2') {
    return 2;
  } else if (arrayRadon[0].classe_potentiel == '3') {
    return 3;
  } else {
    console.log('Error, radonAnalysis unknown class');
  }
};

const risqueAnalysis = (arrayRisque: RisquesData[], numberOccurrences: number): number => {
  const arrayAllNumRisque = arrayRisque.map((item) => {
    return item.risques_detail.map((item) => {
      return parseInt(item.num_risque);
    });
  });
  if (arrayAllNumRisque.length == 0) {
    return 0;
  } else if (arrayAllNumRisque.length << 5) {
    return 1;
  } else if (arrayAllNumRisque.length << 15) {
    return 2;
  } else if (arrayAllNumRisque.length >= 15) {
    return 3;
  } else {
    console.log('Erron in risqueAnalysis, unknown parameters');
  }
};

const mvtAnalysis = (arrayMvt: MVTData[], numberOccurrences: number): number => {
  // This type of data are not very useful
  if ((numberOccurrences = 0)) {
    return 0;
  } else {
    return 1;
  }
};

const sisAnalysis = (arraySIS: SISData[], numberOccurrences: number): number => {
  if ((arraySIS.length = 0)) {
    return 0;
  } else if (arraySIS.length <= 5) {
    return 1;
  } else if (arraySIS.length <= 15) {
    return 2;
  } else if (arraySIS.length > 15) {
    return 3;
  } else {
    console.log('Erron in sisAnalysis, unknown parameters');
  }
};

const TRIAnalysis = (arrayTRI: TRIData[], numberOccurrences: number): number => {
  const arrayRisqueAvere = arrayTRI.map((item) => {
    if (item.date_arrete_pcb && !item.date_arrete_approbation) {
      return item.liste_libelle_risque;
    }
  });
  if (arrayRisqueAvere.length != 0) {
    return 3;
  } else {
    return 0;
  }
};

export const analisysGaspar = async (dataObject: GasparAllObject) => {
  const gasparSizes: Record<string, number | undefined> = {};
  const gasparPoints: Record<string, number | undefined> = {};
  for (const key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      const element = dataObject[key as keyof GasparAllObject];
      gasparSizes[key] = Array.isArray(element) ? element.length : undefined;
      gasparPoints[key] = undefined; //Construc gasparPoints structure for future usage
    }
  }
  gasparPoints.ZonageSismiqueData = sysmiqueAnalysis(dataObject.ZonageSismiqueData, gasparSizes.zonage_sismique);
  gasparPoints.RisquesData = risqueAnalysis(dataObject.RisquesData, gasparSizes.RisquesData);
  gasparPoints.CatnatData = CATNATAnalysis(dataObject.CatnatData, gasparSizes.catnatData);
  gasparPoints.InstallationsClasseesData = installationClasseAnalysis(
    dataObject.InstallationsClasseesData,
    gasparSizes.installations_classees,
  );
  gasparPoints.RadonData = radonAnalysis(dataObject.RadonData, gasparSizes.radonData);
  gasparPoints.MVTData = mvtAnalysis(dataObject.MVTData, gasparSizes.mvt);
  gasparPoints.SISData = sisAnalysis(dataObject.SISData, gasparSizes.SISData);
  gasparPoints.TRIData = TRIAnalysis(dataObject.TRIData, gasparSizes.TRIData);
  gasparPoints.AZIData = AZIAnalysis(dataObject.AZIData, gasparSizes.AZIdata)
  console.log(gasparPoints);
};
