import { Controller, Get, Body, Headers, Param, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { findAddress } from '../../openDataSources/address/findAddress';
import { inputAddressObject, AddressObject } from '../../openDataSources/address/interfaceAddress';
import { analisysGaspar, callAllApiGasparPromiseAll } from '../../openDataSources/geoRisque/Georisque';
import { getDPE } from '../../openDataSources/DPE/getDPE';
import { dataCalculation, qualiteEau } from '../../openDataSources/Eau/qualiteEau';
import { GasparAllObject, RateArrayGeoRisque } from '../../openDataSources/geoRisque/interfaceGeoRisque';
import { ParamAnalyseEau } from '../../openDataSources/Eau/interfaceEau';
import { eauAnalysis } from '../../openDataSources/Eau/eauAnalysis';
import { TokenService } from '../service/token.service';
import { RatingsDBService } from '../service/AllRatingsDB.service';
import { Ratings } from '../../openDataSources/interfaceRatings';
import { PrismaService } from '../service/prisma.service';
import { Roles, RolesGuard } from '../service/roles.guards';
import { RequestExtendsJWT } from '@server/midleware/JWTValidation';
import { response } from 'express';

@Controller('ratingcontroller')
@UseGuards(RolesGuard)
export class RatingController {
  constructor(
    private tokenService: TokenService,
    private RatingsDBService: RatingsDBService,
  ) {} //Inport the token service so I can use it in the controller

  @Get('')
  @Roles('admin')
  @Roles('user')
  async getRatingOfAnAddress(
    @Body() data: inputAddressObject,
    @Req() req: RequestExtendsJWT
  ) {
    try {    
      let dataGaspar: GasparAllObject;
      let dataEau: ParamAnalyseEau[];
      //Find the corresponding address
      const addressObject: AddressObject = await findAddress(data);
      const addressID = { addressID: addressObject.properties.id }; //Unique ID of the address
      console.log(addressObject);
      const resultGaspar: RateArrayGeoRisque = await callAllApiGasparPromiseAll(addressObject).then((res) => {
        dataGaspar = res;
        return analisysGaspar(res);
      });
      const resultDPE = await getDPE(addressObject).then((result) => {});
      const resultEau = await qualiteEau(addressObject).then((res) => {
        dataEau = dataCalculation(res);
        return eauAnalysis(dataEau);
      });
      // Concatenate alle ratings Data
      const allRate = {
        ...addressID,
        ...resultGaspar,
        ...resultEau,
      } as Ratings;
      this
      const savedRating = await this.RatingsDBService.addRating(allRate);
      
      // Link addressID with user ID
      this.RatingsDBService.linkUserIDToAddressID(req?.user.userId,addressID.addressID)
      // return response
      // .status(HttpStatus.OK)
      // .send({ success: true, message: `Data saved successfully` });;
    } catch (err) {
      console.log(err);
    }
  }
}
