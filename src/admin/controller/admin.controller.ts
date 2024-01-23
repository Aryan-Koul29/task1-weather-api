import { Controller, Post, Get, Res, HttpStatus, Body, Headers, UnauthorizedException, Delete, Param } from '@nestjs/common';
import { CreateCityDto } from '../../dto/create-city.dto';
import { CityService } from '../../service/city/city.service';
import { ApiBody, ApiHeader, ApiParam, ApiProperty, ApiResponse, ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { AdminWeatherDto } from '../../dto/admin-weather.dto';
import { AdminCityDto } from '../../dto/admin-city.dto';
import { AdminDeleteCityDto } from '../../dto/admin-delete-city.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {

   constructor(private readonly cityService: CityService) { }

   private readonly credentials = {
      "username": "aryan",
      "password": "123456789"
   }

   @Get()
   @ApiHeader({ name: "password", required: true })
   @ApiHeader({ name: "username", required: true })

   @ApiResponse({
      status: 200,
      description: 'Successfully retrieved city details',
      type: AdminWeatherDto,
      isArray: true,
   })


   async getCities(@Res() response, @Headers() headers) {
      try {
         if (headers.username === this.credentials.username && headers.password === this.credentials.password) {
            const cityData = await this.cityService.getAllCities();
            return response.status(HttpStatus.OK).json({
               message: 'Here are the cities:', cityData,
            });
         }
         else {
            throw (UnauthorizedException);
         }
      } catch (err) {
         return response.status(err.status).json(err.response);
      }
   }

   @Post()
   @ApiHeader({ name: "password", required: true })
   @ApiHeader({ name: "username", required: true })
   // @ApiBasicAuth('basic')
   @ApiResponse({
      status: 201,
      description: 'City has been created successfully',
      type: AdminCityDto,
      isArray: true,
    })

   @ApiBody({
      type: CreateCityDto,
      description: 'Json structure for city object',
   })
   async createCity(@Res() response, @Body() createCityDto: CreateCityDto, @Headers() headers) {
      try {
         if (headers.username === this.credentials.username && headers.password === this.credentials.password) {
            const newCity = await this.cityService.createCity(createCityDto);
            return response.status(HttpStatus.CREATED).json({
               message: 'City has been created successfully',
               newCity,
            });
         }
         else {
            throw new UnauthorizedException();
         }
      } catch (err) {
         return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: City not created!',
            error: 'Bad Request'
         });
      }
   }

   @Delete('/:name')
   @ApiHeader({ name: "password", required: true })
   @ApiHeader({ name: "username", required: true })
   @ApiResponse({
      status: 202,
      description: 'City has been successfully deleted',
      type: AdminDeleteCityDto,
      isArray: true,
    })
   async deleteCity(@Res() response, @Param('name') cityName: string, @Headers() headers) {
      try {
         if (headers.username === this.credentials.username && headers.password === this.credentials.password) {
            const deletedCity = await this.cityService.deleteCity(cityName);
            return response.status(HttpStatus.OK).json({
               message: 'City deleted successfully',
               deletedCity,
            });
         }
         else {
            throw (UnauthorizedException);
         }
      } catch (err) {
         return response.status(err.status).json(err.response);
      }
   }

}

