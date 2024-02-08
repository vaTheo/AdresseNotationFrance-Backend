import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // UUID library
import { PrismaService } from '../../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

export type JWTPayload = {
  role: string;
  userUUID: string;
};

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  // Existing method to validate a token
  // Method to create a new token
  createUUID(): string {
    return uuidv4(); // Generates a new UUID
  }
  async isUUIDExistingInDB(uuid: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        userUUID: uuid,
      },
    });

    return user !== null;
  }
  createJWT(userUUID: string, role: string): string {
    const payload = { userUUID, role } as JWTPayload;
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyJWT(JWT: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(JWT, process.env.JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      // Handle the error (log it, return null, throw a custom error, etc.)
      console.error('JWT verification failed:', error.message);
      return null; // Or handle it in another appropriate way
    }
  }

  // Additional methods as needed...
}
