import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './schema/cities.schema';
import { CityService } from './service/city/city.service';
import { UserService } from './user/service/user.service';
import { AdminService } from './admin/service/admin.service';
// import { CityController } from './service/city/city.controller';
// import { HttpService } from '@nestjs/axios';
import { UserController } from './user/controller/user.controller';
import { AdminController } from './admin/controller/admin.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AdminModule, MongooseModule.forRoot(process.env.DB_URI, {
    dbName:process.env.DB_NAME, 
    auth: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  }), MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]), HttpModule, ConfigModule.forRoot({envFilePath: '.env',})],
  controllers: [AppController, UserController, AdminController],
  providers: [AppService, UserService, AdminService, CityService],
})
export class AppModule {}