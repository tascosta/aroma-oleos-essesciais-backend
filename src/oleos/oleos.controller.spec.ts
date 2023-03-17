import { Test, TestingModule } from '@nestjs/testing';
import { OleosController } from './oleos.controller';

describe('OleosController', () => {
  let controller: OleosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OleosController],
    }).compile();

    controller = module.get<OleosController>(OleosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
