import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Не корректный email'})
    readonly email: string

    @ApiProperty({example: '1234567890', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 20, {message: 'Длина от 4-20'})
    readonly password: string
}