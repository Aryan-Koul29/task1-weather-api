import { ApiProperty } from '@nestjs/swagger';

export class AdminWeatherDto {
  @ApiProperty({
    description: 'Here are the cities:',
    example: {
        "_id": "65a7acaec15a7fe26a677e13",
        "name": "Jammu",
        "__v": 0
      },
  })
  cityData: Object;
}