import { EauPotableData, RatesEau } from "./eau";

export const eauAnalysis = (result: EauPotableData[]): RatesEau => {
  let numberFail = 0;
  result.forEach((element) => {
    if (!element.good) {
      numberFail += 1;
      console.log(element);
    }
  });
  console.log(numberFail);
  if (numberFail == 0) {
    return { eauPotable: 0,coursEau:0 };
  } else if (numberFail <= 1) {
    return { eauPotable: 1,coursEau:0 };
  } else if (numberFail <= 2) {
    return { eauPotable: 2 ,coursEau:0};
  } else if (numberFail >= 3) {
    return { eauPotable: 3 ,coursEau:0};
  } else {
    console.log('ERROR in eauAnalysis');
  }
};
