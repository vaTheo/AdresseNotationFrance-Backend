import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../datarating/token/token.service';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { AsUUID } from '@server/midleware/asUUID';
import { PrismaCallDBService } from '@server/prisma/prismaDB.service';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [PrismaService,TokenService,UserService,PrismaCallDBService], //Service and midlware  
})
export class UserModule {}

