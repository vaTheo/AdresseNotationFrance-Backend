import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { jsonGeorisque } from './jsonGeorisque';
import { jsonGeorisqueMapping } from './jsonGeorisque.const';
import { GeorisqueAllData } from '../datarating/fetch-georisque/Georisque';

@Injectable()
export class DBJsonGeorisque {
  constructor(private prisma: PrismaService) {}

  /**
   *
   * @param addressID
   * @param jsonToGet
   * @returns
   */
  async getSpecificJsonDataGeorisque(addressID: string, jsonToGet: keyof jsonGeorisque): Promise<any | null> {
    // Convert jsonToGet to actual database field
    const dbField = jsonGeorisqueMapping[jsonToGet];
    if (!dbField) {
      throw new NotFoundException(`Invalid field name: ${jsonToGet}`);
    }

    const dataSourceWithJsonData = await this.prisma.addressInfo.findUnique({
      where: { addressID: addressID },
      include: {
        jsonDataGeorisque: {
          select: { [dbField]: true },
          take: 1, // Assuming one-to-one relation or taking the first entry
        },
      },
    });
    if (
      !dataSourceWithJsonData ||
      !dataSourceWithJsonData.jsonDataGeorisque ||
      dataSourceWithJsonData.jsonDataGeorisque.length === 0
    ) {
      throw new NotFoundException(`No JSON data found for addressID: ${addressID}`);
    }

    const jsonData = dataSourceWithJsonData.jsonDataGeorisque[0][dbField] as string;
    if (jsonData === null || jsonData === undefined) {
      throw new NotFoundException(`No JSON data found for addressID: ${addressID} and field: ${jsonToGet}`);
    }
    // TODO: Why JSON data is type never when I remove the as string ?.???
    return await JSON.parse(jsonData);
  }

  /**
   *
   * @param dataSourceID
   * @param dataGeorisque
   */
  async addJsonGeorisque(addressID: string, dataGeorisque: GeorisqueAllData) {
    try {
      const createData: any = { addressID: addressID };
      const fields: Array<keyof GeorisqueAllData> = Object.keys(dataGeorisque) as Array<
        keyof GeorisqueAllData
      >;

      fields.forEach((field) => {
        if (dataGeorisque[field]) {
          createData[field] = JSON.stringify(dataGeorisque[field]);
        }
      });

      await this.prisma.jsonDataGeorisque.create({ data: createData });
    } catch (err) {
      console.error(`Error in addJsonGeorisque: ${err.message}`);
    }
  }

  async isFilled(addressId: string): Promise<boolean> {
    try {
      const count = await this.prisma.jsonDataGeorisque.count({
        where: {
          addressID: addressId,
        },
      });

      return count > 0 || false;
    } catch (err) {
      console.log('Nothing as been find in isFilled function');
      return false;
    }
  }
}
