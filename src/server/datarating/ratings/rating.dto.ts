import { IsString, Length } from 'class-validator';
import { jsonGeorisque } from '../../DBjson-Georisque/jsonGeorisque';
import { jsonEau } from '../../DBjson-Eau/jsonEau';

export class AddressObjectThreeValueDTO {
  @Length(5, 5)
  @IsString()
  postCode: string;

  @IsString()
  city?: string;

  @IsString()
  street: string;
}
export class AddressObjectDTO{
  @IsString()
  address:string;
}
export class JsonGeorisqueDTO{
  @IsString()
  addressID:string
  
  @IsString()
  jsonData:keyof jsonGeorisque
  
}

export class JsonEauDTO{
  @IsString()
  addressID:string
  
  @IsString()
  jsonData:keyof jsonEau
  
}
