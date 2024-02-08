import * as turf from '@turf/turf';

export interface CartoParcResponse {
    type: string;
    features: FeatureCarto[];
    totalFeatures: number;
    numberMatched: number;
    numberReturned: number;
    timeStamp: string;
    crs: CRSCarto;
    bbox: number[];
  }
  
  interface FeatureCarto {
    type?: string;
    id?: string;
    geometry?: GeometryCarto;
    geometry_name?: string;
    properties?: PropertiesCarto;
    area?:number;
  }
  
  interface GeometryCarto {
    type: string;
    coordinates: number[][][][];
  }
  
  interface PropertiesCarto {
    sitecode: string;
    sitename: string;
    url: string;
    bbox: number[];
  }
  
  interface CRSCarto {
    type: string;
    properties: {
      name: string;
    };
  }