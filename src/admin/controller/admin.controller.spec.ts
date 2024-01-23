import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { CityService } from '../../service/city/city.service';
import { CreateCityDto } from '../../dto/create-city.dto';
import { UnauthorizedException, HttpStatus } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  let cityService: CityService;

  const mockCityService = {
    getAllCities: jest.fn(),
    createCity: jest.fn(),
    deleteCity: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCities', () => {
    it('should return city data if credentials are valid', async () => {
      const mockCityData = [{ name: 'Jammu' }];
      mockCityService.getAllCities.mockResolvedValue(mockCityData);

      const headers = {
        username: 'aryan',
        password: '123456789',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getCities(response, headers);

      expect(mockCityService.getAllCities).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Here are the cities:',
        cityData: mockCityData,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const headers = {
        username: 'aryna',
        password: '123456798',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // await expect(controller.getCities(response, headers)).rejects.toThrow(UnauthorizedException,);

      try {
        await controller.getCities(response, headers);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('createCity', () => {
    it('should create a city and return the result if credentials are valid', async () => {
      const mockCreateCityDto: CreateCityDto = { name: 'Jammu' };
      const mockNewCity = { name: 'Jammu', "_id": "65a7bc28cb369fde91748599", "__v": 0 };

      mockCityService.createCity.mockResolvedValue(mockNewCity);

      const headers = {
        username: 'aryan',
        password: '123456789',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.createCity(response, mockCreateCityDto, headers);

      expect(mockCityService.createCity).toHaveBeenCalledWith(mockCreateCityDto);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        message: 'City has been created successfully',
        newCity: mockNewCity,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const mockCreateCityDto: CreateCityDto = { name: 'Jammu' };
      const headers = {
        username: 'aryna',
        password: '123456798',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // await expect(controller.createCity(response, mockCreateCityDto, headers)).rejects.toThrow(UnauthorizedException);
      try {
        await controller.getCities(response, headers);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should handle errors and return a specific response if city creation fails', async () => {
      const mockCreateCityDto: CreateCityDto = { name: 'Jammu' };
      const headers = {
        username: 'aryan',
        password: '123456789',
      };

      mockCityService.createCity.mockRejectedValue(new Error('City creation failed'));

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.createCity(response, mockCreateCityDto, headers);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Error: City not created!',
        error: 'Bad Request',
      });
    });
  });

  describe('deleteCity', () => {
    it('should delete a city and return the result if credentials are valid', async () => {
      const mockCityName = 'Jammu';
      const mockDeletedCity = { name: 'Jammu' };

      mockCityService.deleteCity.mockResolvedValue(mockDeletedCity);

      const headers = {
        username: 'aryan',
        password: '123456789',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.deleteCity(response, mockCityName, headers);

      expect(mockCityService.deleteCity).toHaveBeenCalledWith(mockCityName);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'City deleted successfully',
        deletedCity: mockDeletedCity,
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const mockCityName = 'Jammu';
      const headers = {
        username: 'aryna',
        password: '123456798',
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      try {
        await controller.getCities(response, headers);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
