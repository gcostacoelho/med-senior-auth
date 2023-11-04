import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import { config } from 'dotenv';

async function bootstrap() {
    config();

    const app = await NestFactory.create(AppModule);
    await app.listen(5001);
}
bootstrap();
