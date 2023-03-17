import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OleosModule } from './oleos/oleos.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://talitacosta1384:rhWPm8R5Xd2w2XAF@aroma.nghbiqm.mongodb.net/?retryWrites=true&w=majority'),
    OleosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
