import { Test, TestingModule } from '@nestjs/testing';
import { FetchGeorisqueService } from './fetch-georisque.service';

describe('FetchGeorisqueService', () => {
  let service: FetchGeorisqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchGeorisqueService],
    }).compile();

    service = module.get<FetchGeorisqueService>(FetchGeorisqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
