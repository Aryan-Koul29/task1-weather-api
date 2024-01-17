import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CityService } from '../service/city/city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/schema/cities.schema';
import { CityController } from 'src/service/city/city.controller';
import { UserService } from './service/user.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]), HttpModule, ConfigModule.forRoot({envFilePath: '.env',})],
  controllers: [UserController, CityController],
  providers: [CityService, UserService]
})
export class UserModule {}
