import { Test, TestingModule } from '@nestjs/testing';
import { NonprofitController } from './nonprofit.controller';
import { NonprofitService } from './nonprofit.service';

describe('NonprofitController', () => {
  let controller: NonprofitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonprofitController],
      providers: [NonprofitService],
    }).compile();

    controller = module.get<NonprofitController>(NonprofitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
