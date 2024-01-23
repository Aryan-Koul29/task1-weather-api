import { ApiProperty } from '@nestjs/swagger';

export class AdminDeleteCityDto {
    @ApiProperty({
        description: 'City has been successfully deleted',
        example: {
            "deletedCity": {
                "id": "65afb1f254f0f6e1030cdb45",
                "name": "Jammu",
                "__v": 0
            }
        },
    })
    newCity: Object;
}
