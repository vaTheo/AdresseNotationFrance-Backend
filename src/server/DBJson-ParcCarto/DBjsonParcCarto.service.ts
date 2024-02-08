import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {  jsonParcCarto } from './jsonParcCarto';
import {  jsonParcCartoMapping } from './jsonParcCarto.const';
import { ParcCartoAllData } from '@server/datarating/fetch-cartoParc/cartoParc';
@Injectable()
export class DBJsonParcCarto {
  constructor(private prisma: PrismaService) {}
  /**
   *
   * @param addressID
   * @param jsonToGet
   * @returns
   */
  async getSpecificJson(addressID: string, jsonToGet: keyof jsonParcCarto): Promise<any | null> {
    // Convert jsonToGet to actual database field
    const dbField = jsonParcCartoMapping[jsonToGet];
    if (!dbField) {
      throw new NotFoundException(`Invalid field name: ${jsonToGet}`);
    }

    const dataSourceWithJsonData = await this.prisma.addressInfo.findUnique({
      where: { addressID: addressID },
      include: {
        jsonDataParcCarto: {
          select: { [dbField]: true },
          take: 1, // Assuming one-to-one relation or taking the first entry
        },
      },
    });
    if (
      !dataSourceWithJsonData ||
      !dataSourceWithJsonData.jsonDataParcCarto ||
      dataSourceWithJsonData.jsonDataParcCarto.length === 0
    ) {
      throw new NotFoundException(`No JSON data found for addressID: ${addressID}`);
    }

    const jsonData = dataSourceWithJsonData.jsonDataParcCarto[0][dbField] as string;
    if (jsonData === null || jsonData === undefined) {
      throw new NotFoundException(`No JSON data found for addressID: ${addressID} and field: ${jsonToGet}`);
    }
    return await JSON.parse(jsonData);
  }

  /**
   *
   * @param dataSourceID
   * 
   */
  async addJson(addressID: string, dataParcCarto: ParcCartoAllData) {
    try {
      const createData: any = { addressID: addressID };
      const fields: Array<keyof ParcCartoAllData> = Object.keys(dataParcCarto) as Array<keyof ParcCartoAllData>;

      fields.forEach((field) => {
        if (dataParcCarto[field]) {
          createData[field] = JSON.stringify(dataParcCarto[field]);
        }
      });

      await this.prisma.jsonDataParcCarto.create({ data: createData });
    } catch (err) {
      console.error(`Error in addJsonParcCarto: ${err.message}`);
    }
  }
  async isFilled(addressID: string): Promise<boolean> {
    try {
      const count = await this.prisma.jsonDataParcCarto.count({
        where: {
          addressID: addressID,
        },
      });

      return count > 0 || false;
    } catch (err) {
      return false;
    }
  }


}
