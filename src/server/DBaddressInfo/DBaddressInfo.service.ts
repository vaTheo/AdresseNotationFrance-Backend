import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressInfo } from '@prisma/client';
import { AddressObject } from '@server/datarating/fetch-address/address';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class DBAddressInfo {
  constructor(private prisma: PrismaService) {}

  async createEntry(userUUID: string, addressObject: AddressObject): Promise<AddressInfo | null> {
    // First, find the user by UUID
    const user = await this.prisma.user.findUnique({
      where: { userUUID: userUUID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const addressInfo = await this.prisma.addressInfo.create({
      data: {
        street: addressObject.properties.street,
        city: addressObject.properties.city,
        postcode: addressObject.properties.postcode,
        citycode: addressObject.properties.citycode,
        latitude: addressObject.geometry.coordinates[1],
        longitude: addressObject.geometry.coordinates[0],
        addressID: addressObject.properties.id,
      },
    });
    return addressInfo;
  }

  async addressExists(addressID: string): Promise<boolean> {
    const address = await this.prisma.addressInfo.findUnique({
      where: { addressID:addressID},
    });

    return address !== null;
  }

  async findAddressInfo(addressID: string): Promise<AddressInfo | null> {
    try {
      const address = await this.prisma.addressInfo.findUnique({
        where: { addressID: addressID },
      });
      return address;
    } catch (err) {
      // Log the error for debugging purposes
      console.error('Error in findAddressInfo:', err);
      return null;
    }
  }
}
