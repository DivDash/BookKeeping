import { Test, TestingModule } from '@nestjs/testing';
import { JournalEntriesService } from './journal-entries.service';

describe('JournalEntriesService', () => {
  let service: JournalEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalEntriesService],
    }).compile();

    service = module.get<JournalEntriesService>(JournalEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
