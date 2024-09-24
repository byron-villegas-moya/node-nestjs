import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { AuthRequestDTO } from './dto/auth-request.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const authResponseDTO = new AuthResponseDTO(1, 'Byron Stevens', 'Villegas Moya', 'hjadsfkdkshdgjgksdg');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          ConfigModule.forRoot({
              ignoreEnvVars: true,
              ignoreEnvFile: true
          }),
          ConfigModule,
          TerminusModule
      ],
      controllers: [AuthController],
      providers: [
          {
              provide: AuthService,
              useValue: {
                  signIn: jest.fn().mockResolvedValue(authResponseDTO)
              }
          }
      ]
  }).compile();

  authController = module.get<AuthController>(AuthController);
  authService = module.get<AuthService>(AuthService);
  });

  describe('auth', () => {
    it('should return an user token', async () => {
      const authRequestDTO = new AuthRequestDTO('admin', 'admin123');
      expect(await authController.signIn(authRequestDTO)).toStrictEqual(authResponseDTO);
    });
  });
});