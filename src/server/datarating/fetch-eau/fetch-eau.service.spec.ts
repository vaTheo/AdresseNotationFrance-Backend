import { Test, TestingModule } from '@nestjs/testing';
import { FetchEauService } from './fetch-eau.service';

describe('FetchEauService', () => {
  let service: FetchEauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchEauService],
    }).compile();

    service = module.get<FetchEauService>(FetchEauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
