import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HttpResponse, badRequest, serviceError, success, unauthorized } from '../Types/HttpResponse';
import { Login } from '../Models/Login';
import { PrismaConfig } from 'src/Configs/PrismaConfig';

@Injectable()
export class AppService {
    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaConfig) { }

    async sigIn(email: string, pass: string): Promise<HttpResponse> {
        try {
            const loginInfoParams = new Login(email, pass, this.prisma);
            const data = await loginInfoParams.getUserInformationsLogin();

            if (!data) {
                const body = {
                    code: "emailNotFound",
                    message: "Usuário não encontrado"
                }

                return badRequest(body);
            }

            const passMatch = await loginInfoParams.compareHashWithPass(data.senhaUsuario);

            if (!passMatch) {
                const body = {
                    code: "passDontMatch",
                    message: "Senha não compátivel com usuário"
                }

                return badRequest(body);
            }

            const payload = {
                sub: data.id,
                nome: data.Idoso.Nome,
                email: data.emailUsuario
            }

            return success({
                "idUsuario": data.Idoso.id,
                "access_token": await this.jwtService.signAsync(payload)
            });

        } catch (error) {
            return serviceError(error);
        }
    }

    async compareJwtService(token: string): Promise<HttpResponse> {
        try {
            try {
                await this.jwtService.verifyAsync(token, {
                    secret: process.env.SECRET
                });

            } catch (error) {
                return unauthorized();
            }

            return success({
                "valid": true,
                "access_token": token
            })
        } catch (error) {
            return serviceError(error);
        }
    }
}
