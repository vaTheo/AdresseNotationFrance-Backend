import { ResultItemDPE } from './api-DPE';

export interface RatesDPE {
  DPEHabitatExistant?: number;
  DPEHabitatNeuf?: number;
  DPETertiaire?: number;
  DPEHabitatExistantAvant2021?: number;
  DPETertiaireAvant2021?: number;
}
export interface DPEAllData {
  DPEHabitatExistant?: ResultItemDPE[];
  DPEHabitatNeuf?: ResultItemDPE[];
  DPETertiaire?: ResultItemDPE[];
  DPEHabitatExistantAvant2021?: ResultItemDPE[];
  DPETertiaireAvant2021?: ResultItemDPE[];
}
