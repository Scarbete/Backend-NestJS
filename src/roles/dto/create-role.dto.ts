import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Значение'})
    readonly value: string

    @ApiProperty({example: 'Администратор', description: 'Описание'})
    readonly description: string
}