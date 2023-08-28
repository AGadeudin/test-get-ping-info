import { Module } from '@nestjs/common';
import { GetinfobyidController } from './getinfobyid.controller';
import { GetinfobyidService } from './getinfobyid.service';

@Module({
  controllers: [GetinfobyidController],
  providers: [GetinfobyidService],
})
export class GetinfobyidModule {}
