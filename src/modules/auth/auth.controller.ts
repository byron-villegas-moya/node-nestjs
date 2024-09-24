import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto/auth-request.dto';
import { AuthResponseDTO } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOkResponse({
    type: AuthResponseDTO
  })
  @Post()
  signIn(@Body() authRequestDTO: AuthRequestDTO) {
    return this.authService.signIn(authRequestDTO);
  }
}