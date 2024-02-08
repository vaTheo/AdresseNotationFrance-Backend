import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles, RolesGuard } from '../midleware/roles.guards';
import { TokenService } from '../datarating/token/token.service';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Request, Response, response } from 'express';
import { CreateUserDto, LoginUserDto, serRoleUserDto } from '@server/users/user.dto';
import { RequestExtendsJWT } from '@server/midleware/JWTValidation';
import { PrismaCallDBService } from '@server/prisma/prismaDB.service';
import { DBUserAddressInfo } from '@server/DBUserAddressInfo/DBUserAddressInfo.service';


@Controller('user')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private DBUserAddressInfo: DBUserAddressInfo,

  ) {} //Inport the token service so I can use it in the controller


  @Post('login')
  async loginUser(@Body() data: CreateUserDto, @Res() response: Response) {
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) throw new HttpException('User does not exist ', HttpStatus.UNAUTHORIZED);
    //Verify password
    if (!this.userService.verifyPassword(data.password, user.password))
      throw new HttpException('Password incorect ', HttpStatus.UNAUTHORIZED);

    const signedJWT = this.tokenService.createJWT(user.userUUID, user.role);
    // Set authorization header and send response
    response.cookie('authorization', `Bearer ${signedJWT}`, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000), // Expires in 1 hour
    });
    return response.status(HttpStatus.OK).send({ success: true, message: 'Login successfull' });
  }

  @Post('register')
  async registerUser(@Body() data: LoginUserDto, @Req() request: Request, @Res() response: Response) {
    // Verify if the email does not exist ?
    let user = await this.userService.findUserByEmail(data.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT); // 409 Conflict
    }
    // Verify if the UUID store in the browser is not allready associated with an user
    let uuidToken = request.cookies['uuidtoken']; //Find cookie with name uuidtoken
    if (await this.userService.findUserByUUID(uuidToken)) {
      console.log('UUID allready associated with user, generate a new one and create user');
      uuidToken = this.tokenService.createUUID();
      response.cookie('uuidtoken', uuidToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 3600000), // Expires in 30 days
      });
      await this.userService.createUserWithUUID(uuidToken);
    }
    // hash the password
    const hashedPassword = await this.userService.hashPassword(data.password);

    // Update the user with UUID in the DB whith ashed password
    user = await this.userService.updateUserByUUID(uuidToken, data.email, hashedPassword);
    return response
      .status(HttpStatus.OK)
      .send({ success: true, message: `User created successfully ${user}` });
  }
  @Get('logout')
  async logout() {
    try {
      response.clearCookie('authorization');
      return response.status(HttpStatus.OK).send({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      throw new HttpException(`Logout failled with ${err}`, HttpStatus.CONFLICT);
    }
  }

  @Post('setrole')
  @Roles('admin')
  async setUserRole(@Body() data: serRoleUserDto) {
    try {
      let user = await this.userService.findUserByEmail(data.email);
      if (!user) throw new HttpException('User does not exist ', HttpStatus.UNAUTHORIZED);
      user = await this.userService.updateUserByUUID(user.userUUID, undefined, undefined, undefined, data.role);
      return response
        .status(HttpStatus.OK)
        .send({ success: true, message: `Role successfully changed ${user}` });
    } catch (err) {
      throw new HttpException(`Role change error ${err}`, HttpStatus.CONFLICT);
    }
  }

  @Get('list')
  @Roles('admin')
  async getListUser(@Body() data: any) {}

  @Get('listaddress')
  @Roles('admin')
  async getListAddressIDsOfUser(@Body() data: any, @Req() request: RequestExtendsJWT) {
    console.log(await this.DBUserAddressInfo.findUsersAddressIDsByID(request?.user.userUUID));
  }

  @Delete('delet')
  @Roles('user')
  async deletUser(@Body() data: any) {}

  @Get('user/:id')
  async getProfileByID(@Body() data: any) {}

  @Patch('user/:id')
  async patchProfileByID(@Body() data: any) {}
}
