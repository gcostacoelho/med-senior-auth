import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from "express";

import { AppService } from '../Services/app.service';

@Controller('authentication')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('login/:email/:pass')
    async getJwtToken(@Param('email') email: string, @Param('pass') password: string, @Res() resp: Response) {
        const data = await this.appService.sigIn(email, password);

        return resp.status(data.statusCode).json(data.body);
    }

    @Get('validate/:token')
    async tokenIsValid(@Param('token') token: string, @Res() resp: Response) {
        const data = await this.appService.compareJwtService(token);

        return resp.status(data.statusCode).json(data.body);
    }
}
