import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService:AuthService) {
    }
  
    @Post('/login')
    async loginUser(@Body() user) {
      const data = await this.authService.loginUser( user.username, user.password);
      return data;
    }
}
