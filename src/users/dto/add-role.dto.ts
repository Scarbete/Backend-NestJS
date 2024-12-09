import { IsNumber, IsString } from 'class-validator'

export class AddRoleDto {
    @IsString({message: 'Должно быть строкой'})
    readonly value: string // Значение роли

    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number // id user к которому будет добавлена роль
}