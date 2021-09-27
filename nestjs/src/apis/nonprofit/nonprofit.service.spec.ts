import { Test, TestingModule } from '@nestjs/testing';
import { NonprofitService } from './nonprofit.service';

describe('NonprofitService', () => {
  let service: NonprofitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonprofitService],
    }).compile();

    service = module.get<NonprofitService>(NonprofitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
