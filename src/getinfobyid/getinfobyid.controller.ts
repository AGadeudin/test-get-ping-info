import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetinfobyidService } from './getinfobyid.service';
import { GetInfoById } from './dto/getinfobyid.dto';

@Controller('getinfobyid')
export class GetinfobyidController {
  constructor(private readonly getInfoById: GetinfobyidService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async ping(@Body() dto: GetInfoById): Promise<string> {
    return await this.getInfoById.returnPipe(dto);
  }
}
