import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipes/validation.pipe'

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)

        const config = new DocumentBuilder()
            .setTitle('Продвинутый Backend')
            .setDescription('Документация REST API')
            .setVersion('1.0.0')
            .addTag('Quasar')
            .build()

        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('/swagger', app, document)

        app.useGlobalPipes(new ValidationPipe()) // - глобальное указание валидации request.body
        // app.useGlobalGuards(JwtAuthGuard) - ограничение всех api

        await app.listen(PORT)
    }
    catch (error) {
        return Promise.reject(error)
    }
}

start()
    .then(() => console.log(`Starting app... http://localhost:${PORT}`))
    .catch(error => console.error(error.message))