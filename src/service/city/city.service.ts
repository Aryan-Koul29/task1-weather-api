import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCityDto } from 'src/dto/create-city.dto';
import { ICity } from 'src/interface/cities.interface';
import { Model } from "mongoose";
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CityService {
    constructor(@InjectModel('City') private cityModel:Model<ICity>, private readonly httpService: HttpService, private configService: ConfigService) { }

    async createCity(createCityDto: CreateCityDto): Promise<ICity> {
        const newCity = await new this.cityModel(createCityDto);
        return newCity.save();
    }

    async getAllCities(): Promise<ICity[]> {
        const cityData = await this.cityModel.find();
        if (!cityData || cityData.length == 0) {
            throw new NotFoundException('No Cities Found!');
        }
        return cityData;
    }

    async getAllCityWeathers(): Promise<any> {
        const cityData = await this.cityModel.find();
        if (!cityData || cityData.length == 0) {
            throw new NotFoundException("No Cities Found!");
        }
        var weatherData = {};
        var OPENWEATHER_API_KEY = this.configService.get<string>('OPENWEATHER_API_KEY');
        for (const city in cityData) {
            if (Object.prototype.hasOwnProperty.call(cityData, city)) {
                var cityName = cityData[city]["name"];
                var { data } = await firstValueFrom(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${OPENWEATHER_API_KEY}`));
                // var cityWeather = {};
                weatherData[cityName] = {};
                weatherData[cityName]["weather"] = {};
                weatherData[cityName]["weather"]["main"] = data["weather"][0]["main"];
                weatherData[cityName]["weather"]["description"] = data["weather"][0]["description"];
                weatherData[cityName]["temp_stats"] = data["main"];
                // weatherData.push(data);
            }
        }
        // var response = await firstValueFrom(this.httpService.get("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=39455af1d3438c0ac1a5a88efdab70a6"))
        return weatherData;
    }

    async deleteCity(cityName: string): Promise<ICity> {
        const deletedCity = await this.cityModel.findOneAndDelete({"name":cityName});
       if (!deletedCity) {
         throw new NotFoundException(`City ${cityName} was not found`);
       }
       return deletedCity;
    }
    }
