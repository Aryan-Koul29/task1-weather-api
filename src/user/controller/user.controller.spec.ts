import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CityService } from '../../service/city/city.service';
import { UserWeatherDto } from '../../dto/user-weather.dto';
import { HttpStatus, Res } from '@nestjs/common';
import exp from 'constants';

jest.mock('../../service/city/city.service');

describe('UserController', () => {
  let controller: UserController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CityService],
    }).compile();

    controller = module.get<UserController>(UserController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCityWeathers', () => {
    it('should return weather data', async () => {
      const mockWeatherData: any = [
        {
          "Hyderabad": {
            "weather": {
              "main": expect.any(String),
              "description": expect.any(String)
            },
            "temp_stats": {
              "temp": expect.any(Number),
              "feels_like": expect.any(Number),
              "temp_min": expect.any(Number),
              "temp_max": expect.any(Number),
              "pressure": expect.any(Number),
              "humidity": expect.any(Number)
            }
          }
        }
      ];
      jest.spyOn(cityService, 'getAllCityWeathers').mockResolvedValue(mockWeatherData);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getCityWeathers(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockWeatherData);
    });

    it('should handle errors', async () => {
      const mockError = { status: HttpStatus.INTERNAL_SERVER_ERROR, response: { error: 'Something went wrong' } };
      jest.spyOn(cityService, 'getAllCityWeathers').mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller method
      await controller.getCityWeathers(mockResponse);

      // Verify that the response status and json methods were called with the expected values
      expect(mockResponse.status).toHaveBeenCalledWith(mockError.status);
      expect(mockResponse.json).toHaveBeenCalledWith(mockError.response);
    });
  });
});
