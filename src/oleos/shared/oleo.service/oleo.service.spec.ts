import { Test, TestingModule } from '@nestjs/testing';
import { OleoService } from './oleo.service';

describe('OleoService', () => {
  let provider: OleoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OleoService],
    }).compile();

    provider = module.get<OleoService>(OleoService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
