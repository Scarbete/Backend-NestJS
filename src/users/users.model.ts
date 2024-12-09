import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'
import { Post } from '../posts/posts.model'

type UserCreationAttrs = {
    email: string
    password: string
}

@Table({tableName: 'users'}) /** Указание название таблицы в db */
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'example@gmail.com', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: '1234567890', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'За флуд', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    /** Many to Many связь - Оно также пишется в Role */
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}