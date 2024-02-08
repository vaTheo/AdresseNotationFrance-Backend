import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { AsUUID } from '../../midleware/asUUID';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RatingsDBService } from './ratingsDB.service';
import { isConnected } from '../../midleware/isConnected';
import { UserService } from '../../users/user.service';
import { FetchAddressService } from '@server/datarating/fetch-address/address.service';
import { FetchEauService } from '@server/datarating/fetch-eau/fetch-eau.service';
import { FetchGeorisqueService } from '@server/datarating/fetch-georisque/fetch-georisque.service';
import { DBJsonGeorisque } from '../../DBjson-Georisque/DBjsonGeorisque.service';
import { DBUserAddressInfo } from '../../DBUserAddressInfo/DBUserAddressInfo.service';
import { DBAddressInfo } from '../../DBaddressInfo/DBaddressInfo.service';
import { DBAllRatings } from '../../DBallRatings/DBallRatings.service';
import { FetchParcCarto } from '../fetch-cartoParc/fetch-cartoParc.service';
import { DBJsonEau } from '../../DBjson-Eau/DBjsonEau.service';
import { DBJsonParcCarto } from '../../DBJson-ParcCarto/DBjsonParcCarto.service';
import { FetchDPE } from '../fetch-dpe/fetch-DPE.service';
import { DBJsonDPE } from '@server/DBJson-DPE/DBjsonDPE.service';

@Module({
  imports: [],
  controllers: [RatingController],
  providers: [
    PrismaService,
    RatingsDBService,
    TokenService,
    UserService,
    FetchAddressService,
    FetchEauService,
    FetchGeorisqueService,
    DBJsonGeorisque,
    DBJsonEau,
    DBUserAddressInfo,
    DBAddressInfo,
    DBAllRatings,
    FetchParcCarto,
    DBJsonParcCarto,
    FetchDPE,
    DBJsonDPE,
  ], //Service and midlware
})
export class DataRatingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsUUID, isConnected).forRoutes(RatingController); // Apply to all routes in RatingController
  }
}
