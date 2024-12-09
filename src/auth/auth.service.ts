import * as bcrypt from 'bcryptjs'
import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/users.model'

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    @Post('/login')
    async login(@Body() userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto) {
        /** Проверяем в db есть ли пользователь с таким email если есть бросаем ошибку */
        const condidate = await this.userService.getUserByEmail(userDto.email)
        if (condidate) throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)

        /** Хешируем пароль и создаем аккаунт с hashPassword */
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})

        /** Отдаю токены на клиент */
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {token: this.jwtService.sign(payload)}
    }

    private async validateUser(userDto: CreateUserDto) {
        /** Проверка пароля и если пароль валиден то отдаю клиенту обьект User */
        const user: User = await this.userService.getUserByEmail(userDto.email)
        if (!user) throw new UnauthorizedException({ message: 'Пользователь не найден' })
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) return user

        /** Иначе бросаю ошибку UnauthorizedException() */
        throw new UnauthorizedException({message: 'Не корректный email или password'})
    }
}
