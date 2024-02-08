import { RatesEau } from '@server/datarating/fetch-eau/eau';
import { RatesGeoRisque } from '@server/datarating/fetch-georisque/Georisque';
import { RatesParcCarto } from '../fetch-cartoParc/cartoParc';
import { RatesDPE } from '../fetch-dpe/DPE';

export interface Ratings extends RatesGeoRisque, RatesEau, RatesParcCarto, RatesDPE {
  addressID?: string;
}
