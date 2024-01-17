import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { CityService } from 'src/service/city/city.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserWeatherDto } from 'src/dto/user-weather.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly cityService: CityService) { }

    @Get()
    @ApiResponse({
      status: 200,
      description: 'Successfully retrieved weather details',
      type: UserWeatherDto,
      isArray: true,
    })
    
    async getCityWeathers(@Res() response) {
        try {
          const weatherData = await this.cityService.getAllCityWeathers();
          return response.status(HttpStatus.OK).json(weatherData);
         } catch (err) {
          return response.status(err.status).json(err.response);
         }
        }
}
