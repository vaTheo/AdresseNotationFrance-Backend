import {
  AZIData,
  CatnatData,
  InstallationsClasseesData,
  MVTData,
  RadonData,
  RisquesData,
  SISData,
  TRIData,
  ZonageSismiqueData,
} from './api-georisque';
 
/**
   * AZI data Analysis of Georisque API
   * @param {arrayAZI} - array of AZI data
   * @returns {number} - note calculate with the input
   */
export const AZIAnalysis = (arrayAZI: AZIData[], numberOccurrences: number): number => {
 
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

export const sysmiqueAnalysis = (arraySismique: ZonageSismiqueData[], numberOccurrences: number): number => {
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
  } else {
    console.log('SysmiqueAnalysis unknown error with code : ' + arraySismique[0].code_zone);
  }
};

export const CATNATAnalysis = (arrayCATNAT: CatnatData[], numberOccurrences: number): number => {
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

export const installationClasseAnalysis = (
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
export const radonAnalysis = (arrayRadon: RadonData[], numberOccurrences: number): number => {
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

export const risqueAnalysis = (arrayRisque: RisquesData[], numberOccurrences: number): number => {
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

export const mvtAnalysis = (arrayMvt: MVTData[], numberOccurrences: number): number => {
  // This type of data are not very useful
  if ((numberOccurrences = 0)) {
    return 0;
  } else {
    return 1;
  }
};

export const sisAnalysis = (arraySIS: SISData[], numberOccurrences: number): number => {
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

export const TRIAnalysis = (arrayTRI: TRIData[], numberOccurrences: number): number => {
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
