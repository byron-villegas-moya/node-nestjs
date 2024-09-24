import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('authorization.secret') });
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers['authorization'];

        if(!authorization) {
            throw new UnauthorizedException();
        }

        const [type, token] = authorization.split(' ');

        if(!type || !token) {
            throw new UnauthorizedException();
        }
        
        if(!((type as string).toLowerCase() == 'bearer')) {
            throw new UnauthorizedException();
        }

        return token;
    }
}