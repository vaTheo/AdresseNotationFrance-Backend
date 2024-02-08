import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Existing method to validate a token
  // Method to create a new token
  isConnected(): number {
    // verify if the user is connected
    // Return the user ID
    return 0;
  }

  async findUserByID(userUUID: string): Promise<User | null> {
    // find user based on his ID
    const user = await this.prisma.user.findUnique({
      where: { userUUID: userUUID },
    });
    return user;
  }
  async userExist(userUUID: string): Promise<boolean> {
    // Check if userId exists in User table
    const userExists = await this.prisma.user.findUnique({
      where: { userUUID: userUUID },
    });
    return userExists ? true : false;
  }

  async findUserByUUID(userUUID: string): Promise<User | null> {
    // find user based on his ID
    const user = await this.prisma.user.findUnique({
      where: { userUUID: userUUID },
    });
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    // find user based on his ID
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    // find user based on his ID
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }
  async updateUserByUUID(
    UUID: string,
    email?: string,
    hashedPassword?: string,
    username?: string,
    role?: string,
  ): Promise<User | null> {
    try {
      const updateData: any = {};
      if (username !== undefined) updateData.username = username;
      if (hashedPassword !== undefined) updateData.password = hashedPassword;
      if (email !== undefined) updateData.email = email;
      if (role !== undefined) updateData.role = role;

      return await this.prisma.user.update({
        where: { userUUID: UUID },
        data: updateData,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Check for the specific error code for not found
          console.error('User not found for the given ID');
        } else {
          console.log(`ERROR creating user in  'updateUser' methode of user service `);
        }
      }
      return null; // or you can throw a custom error or handle it as per your application's need
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createUserWithUUID(uuid: string): Promise<any> {
    // Create a new user in the database with the given token
    return await this.prisma.user.create({
      data: {
        userUUID: uuid,
      },
    });
  }

  // Additional methods as needed...
}
