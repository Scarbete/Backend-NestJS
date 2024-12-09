import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../users/users.model'
import { Role } from './roles.model'

/** убираем с полей таблиц createdAt, updatedAt */
@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Role) /** Связь один к многим */
    @Column({type: DataType.INTEGER})
    roleId: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}