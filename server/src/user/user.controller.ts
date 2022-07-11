import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Response,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('nickname-check')
  async checkNickname(@Body() data: { nickname: string }) {
    return await this.userService.checkNickname(data.nickname);
  }

  @Post('email-check')
  async emailCheck(@Body() data: { email: string }) {
    return await this.userService.checkEmail(data.email);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    return user;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    if (!req.user) {
      res.send('실패');
      return 'no user from google';
    } else {
      console.log(req.user.accessToken)
      res.redirect('http://127.0.0.1:800');
      return {
        message: 'User info from Google',
        user: req.user,
      };
    }
  }

  @Get('logout')
  async logout(@Response() response) {
    try {
      response.clearCookie('connect.sid', { httpOnly: true });
      return response.send({
        success: true,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get('liked-posts')
  async getLikedPosts(@User() user: UserEntity) {
    return await this.userService.getLikedPosts(user.id);
  }

  @Get('commented-posts')
  async getCommentedPosts(@User() user: UserEntity) {
    return await this.userService.getCommentedPosts(user.id);
  }

  @Get('session')
  async isLoggedIn(@User() user: UserEntity, @Req() req) {
    console.log(user);
    console.log(req.session);
  }

  @Get('googletest')
  async test(@Req() req, @Res() res) {
    console.log(req.user)
    console.log(req.session)
    res.send("req.user")
  }
}
