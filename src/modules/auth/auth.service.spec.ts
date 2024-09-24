import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRequestDTO } from './dto/auth-request.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({
                secret: 'sdfsdasfd',
                signOptions: {
                    expiresIn: '60s'
                }
            })],
            controllers: [],
            providers: [
                AuthService,
                JwtService,
            ],
        }).compile();
        jwtService = moduleRef.get<JwtService>(JwtService);
        authService = new AuthService(jwtService);
    });

    describe('signIn', () => {
        it('should return an user token', async () => {
            const authRequestDTO = new AuthRequestDTO('byron.villegas', 'admin123');
            expect(await authService.signIn(authRequestDTO)).toBeTruthy();
        });
        it('should return an UnauthorizedException for username empty', async () => {
            const authRequestDTO = new AuthRequestDTO('', 'admin123');
            try {
            await authService.signIn(authRequestDTO);
            } catch(error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });
        it('should return an UnauthorizedException for password empty', async () => {
            const authRequestDTO = new AuthRequestDTO('byron.villegas', '');
            try {
            await authService.signIn(authRequestDTO);
            } catch(error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });
        it('should return an UnauthorizedException for not found user', async () => {
            const authRequestDTO = new AuthRequestDTO('abc', 'abc');
            try {
            await authService.signIn(authRequestDTO);
            } catch(error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });
    });
});