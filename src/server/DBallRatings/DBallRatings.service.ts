import { Injectable } from '@nestjs/common';
import { AllRatings, Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';
import { Ratings } from '../datarating/ratings/ratings';
import { RatesGeoRisque } from '@server/datarating/fetch-georisque/Georisque';
import { RatesEau } from '@server/datarating/fetch-eau/eau';
import { RatesParcCarto } from '@server/datarating/fetch-cartoParc/cartoParc';

@Injectable()
export class DBAllRatings {
  constructor(private prisma: PrismaService) {}

  /**
   *
   * @param dataSourceID
   * @param rating
   * @returns
   */
  async createEntry(addressID: string): Promise<string> {
    try {
      const result = await this.prisma.allRatings.create({
        data: {
          addressID: addressID,
        },
      });
      return result.addressID;
    } catch (err) {
      throw new Error(`Error saving data to database: ${err.message}`);
    }
  }
  async updateRating(addressID: string, rating: Ratings): Promise<string> {
    try {
      const result = await this.prisma.allRatings.update({
        where: { addressID: addressID },
        data: {
          eauPotable: rating?.eauPotable,
          coursEau: rating?.coursEau,
          AZIData: rating?.AZIData,
          CatnatData: rating?.CatnatData,
          InstallationsClasseesData: rating?.InstallationsClasseesData,
          MVTData: rating?.MVTData,
          RadonData: rating?.RadonData,
          RisquesData: rating?.RisquesData,
          SISData: rating?.SISData,
          TRIData: rating?.TRIData,
          ZonageSismiqueData: rating?.ZonageSismiqueData,
          naturaHabitat: rating?.naturaHabitat,
          naturaOiseaux: rating?.naturaOiseaux,
          pn: rating?.pn,
          pnr: rating?.pnr,
          rnc: rating?.rnc,
          rncf: rating?.rncf,
          rnn: rating?.rnn,
          znieff1: rating?.znieff1,
          znieff2: rating?.znieff2,
          DPEHabitatExistant:rating?.DPEHabitatExistant,
          DPEHabitatNeuf:rating?.DPEHabitatExistant,
          DPETertiaire:rating?.DPETertiaire,
          DPEHabitatExistantAvant2021:rating?.DPEHabitatExistantAvant2021,
          DPETertiaireAvant2021:rating?.DPETertiaireAvant2021,
        
        },
      });
      return result.addressID;
    } catch (err) {
      throw new Error(`Error saving data to database: ${err.message}`);
    }
  }

  // Method to retrieve a rating by addressID
  async getRatingByAddressId(addressId: string): Promise<AllRatings | null> {
    const rating = await this.prisma.allRatings.findUnique({
      where: { addressID: addressId },
    });
    return rating;
  }

  // Method to retrieve a rating by addressID
  async getRatingGeorisqueByAddressId(addressId: string): Promise<RatesGeoRisque | null> {
    const rating = await this.prisma.allRatings.findUnique({
      where: { addressID: addressId },
    });
    const rate = {
      AZIData: rating.AZIData,
      CatnatData: rating.CatnatData,
      InstallationsClasseesData: rating.InstallationsClasseesData,
      MVTData: rating.MVTData,
      RadonData: rating.RadonData,
      RisquesData: rating.RisquesData,
      SISData: rating.SISData,
      TRIData: rating.TRIData,
      ZonageSismiqueData: rating.ZonageSismiqueData,
    };
    return rate;
  }

  async getRatingEauByAddressId(addressId: string): Promise<RatesEau | null> {
    const rating = await this.prisma.allRatings.findUnique({
      where: { addressID: addressId },
    });
    const rate: RatesEau = {
      coursEau: rating.coursEau,
      eauPotable: rating.eauPotable,
    };
    return rate;
  }

  async getRatingParcCartoByAddressId(addressId: string): Promise<RatesParcCarto | null> {
    const rating = await this.prisma.allRatings.findUnique({
      where: { addressID: addressId },
    });
    const rate: RatesParcCarto = {
      naturaHabitat: rating.naturaHabitat,
      naturaOiseaux: rating.naturaOiseaux,
      pn: rating.pn,
      pnr: rating.pnr,
      rnc: rating.rnc,
      rncf: rating.rncf,
      rnn: rating.rnn,
      znieff1: rating.znieff1,
      znieff2: rating.znieff2,
    };
    return rate;
  }
  /**
   * Checks if an entry with the given addressID already exists in the database.
   *
   * @param addressID The ID of the address to check.
   * @returns true if the entry exists, false otherwise.
   */
  async entryExists(addressID: string): Promise<boolean> {
    const entry = await this.prisma.allRatings.findUnique({
      where: { addressID: addressID },
    });
    return entry !== null;
  }

  // Method to delete a rating
  async deleteRating(addressId: string): Promise<AllRatings> {
    return this.prisma.allRatings.delete({
      where: { addressID: addressId },
    });
  }
}
