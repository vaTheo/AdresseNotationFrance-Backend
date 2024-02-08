import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AllRatings } from '@prisma/client';


@Injectable()
export class PrismaCallDBService {
  constructor(private prisma: PrismaService) {}

  async findRatingsByAddressID(addressID: string): Promise<AllRatings> {
    const ratings = await this.prisma.allRatings.findUnique({
      where: {
        addressID: addressID,
      },
    });
    return ratings;
  }
}
