import * as path from 'path'

/** MODULES */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'

/** MODELS */
import { User } from './users/users.model'
import { Role } from './roles/roles.model'
import { UserRoles } from './roles/user-roles.model'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/posts.model'

@Module({
    controllers: [],
    providers: [],
    imports: [
        /** ConfigModule - модуль тоже самое что и dotenv */
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        /** static */
        ServeStaticModule.forRoot({
            // rootPath: path.resolve(__dirname, '..', 'static'),
            rootPath: path.resolve(process.cwd(), 'static'),
        }),
        /** SequelizeModule (ORM) - облегчение запросов чтобы не писать голые SQL запросы */
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post],
            autoLoadModels: true,
            synchronize: true
        }),
        /** Other Modules */
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {}
