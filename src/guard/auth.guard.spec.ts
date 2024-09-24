import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException } from "@nestjs/common";

describe('AuthGuard', () => {
    const secret = 'sdfsdasfd';
    let authGuard: AuthGuard;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({
                secret: secret,
                signOptions: {
                    expiresIn: '60s'
                }
            })],
            controllers: [],
            providers: [
                AuthGuard,
                JwtService,
                ConfigService
            ],
        }).compile();
        jwtService = moduleRef.get<JwtService>(JwtService);
        configService = moduleRef.get<ConfigService>(ConfigService);
        authGuard = new AuthGuard(jwtService, configService);
    });

    describe('canActivate', () => {
        it('should return true', async () => {
            jest.spyOn(configService, 'get').mockReturnValue(secret);
            let token = await jwtService.signAsync({ id: 1, nombres: 'Byron Stevens', apellidos: 'Villegas Moya', authorities: '', scope: '' });
            const context = {
                getClass: jest.fn(),
                getHandler: jest.fn(),
                switchToHttp: jest.fn(() => ({
                    getRequest: jest.fn().mockReturnValue({
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    })
                }))
            } as any;
            expect(await authGuard.canActivate(context)).toBeTruthy();
        });

        it('should return error by empty authorization', async () => {
            try {
                const context = {
                    getClass: jest.fn(),
                    getHandler: jest.fn(),
                    switchToHttp: jest.fn(() => ({
                        getRequest: jest.fn().mockReturnValue({
                            headers: {
                                authorization: ''
                            }
                        })
                    }))
                } as any;
                await authGuard.canActivate(context);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should return error by authorization without token', async () => {
            try {
                const context = {
                    getClass: jest.fn(),
                    getHandler: jest.fn(),
                    switchToHttp: jest.fn(() => ({
                        getRequest: jest.fn().mockReturnValue({
                            headers: {
                                authorization: 'Bearer '
                            }
                        })
                    }))
                } as any;
                await authGuard.canActivate(context);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should return error by authorization with space', async () => {
            try {
                const context = {
                    getClass: jest.fn(),
                    getHandler: jest.fn(),
                    switchToHttp: jest.fn(() => ({
                        getRequest: jest.fn().mockReturnValue({
                            headers: {
                                authorization: ' '
                            }
                        })
                    }))
                } as any;
                await authGuard.canActivate(context);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should return error by authorization with different type of token', async () => {
            try {
                const context = {
                    getClass: jest.fn(),
                    getHandler: jest.fn(),
                    switchToHttp: jest.fn(() => ({
                        getRequest: jest.fn().mockReturnValue({
                            headers: {
                                authorization: 'Abc Def'
                            }
                        })
                    }))
                } as any;
                await authGuard.canActivate(context);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });

        it('should return error by invalid secret of token', async () => {
            try {
                jest.spyOn(configService, 'get').mockReturnValue('abcdefghi');
                let token = await jwtService.signAsync({ id: 1, nombres: 'Byron Stevens', apellidos: 'Villegas Moya', authorities: '', scope: '' });
                const context = {
                    getClass: jest.fn(),
                    getHandler: jest.fn(),
                    switchToHttp: jest.fn(() => ({
                        getRequest: jest.fn().mockReturnValue({
                            headers: {
                                authorization: 'Bearer ' + token
                            }
                        })
                    }))
                } as any;
                await authGuard.canActivate(context);
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });
    });
});