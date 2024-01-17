import { ApiProperty } from '@nestjs/swagger';


export class UserWeatherDto {
  @ApiProperty({
    description: 'City Name',
    example: "Mumbai",
  })
  City: String;

  @ApiProperty({
    description: 'Weather',
    example: "Cloud",
  })
  Weather: String;

  @ApiProperty({
    description: 'Temperature, Pressure, Humidity, Sea Level, Ground Level',
    example: {
        "temp": 298.67,
        "feels_like": 298.64,
        "temp_min": 298.67,
        "temp_max": 298.67,
        "pressure": 1016,
        "humidity": 52,
    },
  })
  Main: Object;
}