import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('authorization.secret'),
      signOptions: {
        expiresIn: configService.get<number>('authorization.expiresIn'),
      },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }