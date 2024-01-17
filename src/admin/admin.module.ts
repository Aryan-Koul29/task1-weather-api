import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { CityService } from '../service/city/city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/schema/cities.schema';
import { CityController } from 'src/service/city/city.controller';
import { AdminService } from './service/admin.service';
import { HttpModule} from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]), HttpModule, ConfigModule.forRoot({envFilePath: '.env',})],
  controllers: [AdminController, CityController],
  providers: [CityService, AdminService]
})
export class AdminModule {}
