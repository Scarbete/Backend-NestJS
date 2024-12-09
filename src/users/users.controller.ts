import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './users.model'
import { Roles } from '../auth/role-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
// import { ValidationPipe } from '../pipes/validation.pipe'
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'}) /** Анатация для Swagger */
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe) - валидация данных в конкретной api
    @Post() /** Декоратор для методов HTTP */
    create(@Body() userDto: CreateUserDto) { /** @Body() данные из запроса переносятся в userDto */
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard) - ограниче к api по token
    @Roles('ADMIN') // ограниче к api по token и по role
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles('ADMIN') // ограниче к api по token и по role
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles('ADMIN') // ограниче к api по token и по role
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto)
    }
}
