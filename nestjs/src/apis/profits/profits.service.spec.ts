import { Test, TestingModule } from '@nestjs/testing';
import { ProfitsService } from './profits.service';

describe('ProfitsService', () => {
  let service: ProfitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfitsService],
    }).compile();

    service = module.get<ProfitsService>(ProfitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
