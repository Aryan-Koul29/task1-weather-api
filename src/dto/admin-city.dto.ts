import { ApiProperty } from '@nestjs/swagger';

export class AdminCityDto {
  @ApiProperty({
    description: 'City has been created successfully',
    example: {
        "name": "Jammu",
        "_id": "65a7bc28cb369fde91748599",
        "__v": 0
    },
  })
  newCity: Object;
}
