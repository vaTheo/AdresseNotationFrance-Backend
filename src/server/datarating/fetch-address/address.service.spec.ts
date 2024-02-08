import { Test, TestingModule } from '@nestjs/testing';
import { FetchAddressService } from './address.service';

describe('AddressService', () => {
  let service: FetchAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchAddressService],
    }).compile();

    service = module.get<FetchAddressService>(FetchAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
