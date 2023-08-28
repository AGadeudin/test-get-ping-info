import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetinfobyidModule } from './getinfobyid/getinfobyid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GetinfobyidModule,
  ],
})
export class AppModule {}
