import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @ApiProperty({
        description: 'Name of City',
        example: 'Hyderabad',
        required: true
     })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

}