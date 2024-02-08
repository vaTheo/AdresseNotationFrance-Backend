import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressObject } from '@server/datarating/fetch-address/address';
import axios from 'axios';
import { AddressObjectDTO, AddressObjectThreeValueDTO } from '../ratings/rating.dto';
const URLapi = 'https://api-adresse.data.gouv.fr/search/?q=';

@Injectable()
export class FetchAddressService {
  // Documentation API : https://adresse.data.gouv.fr/api-doc/adresse
  async findAddressWithThreeValues(inputAddressObject: AddressObjectThreeValueDTO): Promise<AddressObject> {
    const querryString = inputAddressObject.street.replace(/\s/g, '+'); //replace space by +

    try {
      const response = await axios.get(`${URLapi}${querryString}&postcode=${inputAddressObject.postCode}`);
      if (!response.data) {
        throw new Error('Error undifined value return by getBANid');
      }
      if (response.data.features.length >> 1) {
        // throw new HttpException('Multiple address find ', HttpStatus.PRECONDITION_FAILED);
        console.error('Multiple address find ' + response.data.features);
      }
      if (!response.data.features[0]) {
        throw new HttpException('No address find', HttpStatus.PRECONDITION_FAILED);
      }
      return response.data.features[0]; //Return the first adresse (Usually there is only one)
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findAddress(inputAddressObject: AddressObjectDTO): Promise<AddressObject> {
    const querryString = inputAddressObject.address.replace(/\s/g, '+'); //replace space by +

    try {
      const response = await axios.get(`${URLapi}${querryString}`);
      if (!response.data) {
        throw new Error('Error undifined value return by getBANid');
      }
      if (response.data.features.length >> 1) {
        // throw new HttpException('Multiple address find ', HttpStatus.PRECONDITION_FAILED);
        console.error('Multiple address find ' + response.data.features);
      }
      if (!response.data.features[0]) {
        throw new HttpException('No address find', HttpStatus.PRECONDITION_FAILED);
      }
      return response.data.features[0]; //Return the first adresse (Usually there is only one)
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
