import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as usuarios from '../../data/usuarios.json';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDTO } from './dto/auth-request.dto';
import { AuthResponseDTO } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { 

    }

    async signIn(authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {
        if(!authRequestDTO.username || !authRequestDTO.password) {
            throw new UnauthorizedException();
        }

        const user = usuarios.find(usuario => usuario.username === authRequestDTO.username && usuario.password === authRequestDTO.password);
    
        if(!user) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, nombres: user.nombres, apellidos: user.apellidos, authorities: '', scope: '' };

        const authResponseDTO = new AuthResponseDTO(user.id, user.nombres, user.apellidos, await this.jwtService.signAsync(payload));

        return authResponseDTO;
    }
}