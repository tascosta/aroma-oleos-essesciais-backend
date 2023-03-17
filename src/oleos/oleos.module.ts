import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OleosController } from './oleos.controller';
import { OleoService } from './shared/oleo.service/oleo.service';
import { OleoSchema } from './schemas/oleo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Oleo', schema: OleoSchema }])],
  controllers: [OleosController],
  providers: [OleoService],
})
export class OleosModule { }
