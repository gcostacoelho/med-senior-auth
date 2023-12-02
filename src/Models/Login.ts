import * as bcrypt from 'bcrypt';

import { PrismaConfig } from "../Configs/PrismaConfig";

export class Login {
    private email: string;
    private password: string;

    constructor(email: string, pass: string, private readonly prisma: PrismaConfig ) {
        this.email = email,
        this.password = pass
    }

    async getUserInformationsLogin(){
        try {
            const userInfo = await this.prisma.login.findUnique({
                include: {
                    Idoso: true
                },
                where: {
                    emailUsuario: this.email
                }
            });

            if (!userInfo) {
                return false;
            }

            return userInfo;
        } catch (error) {
            return error;
        }
    }

    async compareHashWithPass(hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(this.password, hash);

        return isMatch;
    }
}