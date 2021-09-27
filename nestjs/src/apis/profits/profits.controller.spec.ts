import { Test, TestingModule } from '@nestjs/testing';
import { ProfitsController } from './profits.controller';
import { ProfitsService } from './profits.service';

describe('ProfitsController', () => {
  let controller: ProfitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfitsController],
      providers: [ProfitsService],
    }).compile();

    controller = module.get<ProfitsController>(ProfitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
