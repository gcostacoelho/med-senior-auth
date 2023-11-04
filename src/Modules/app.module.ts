import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import { PrismaConfig } from '../Configs/PrismaConfig';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET
        })
    ],
    controllers: [AppController],
    providers: [AppService, PrismaConfig],
})
export class AppModule { }
