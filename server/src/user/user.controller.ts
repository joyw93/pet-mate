import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Req,
  Response,
  InternalServerErrorException,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GoogleAuthGuard } from 'src/auth/google/google-auth.guard';
import { KakaoAuthGuard } from 'src/auth/kakao/kakao-auth.guard';
import { LocalAuthGuard } from 'src/auth/local/local-auth.guard';
import { setProfileConfig } from 'src/common/aws/s3';
import { User } from 'src/common/decorators/user.decorator';
import { ImageFilePipe } from 'src/common/pipes/image-file.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { EditAccountDto } from './dto/edit-account.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { SetProfileDto } from './dto/set-profile.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMyProfile(@User() user: UserEntity) {
    return await this.userService.getMyProfile(user.id);
  }


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

  @Post('profile')
  async setProfile(
    @User() user: UserEntity,
    @Body() setProfileDto: SetProfileDto,
  ) {
    return await this.userService.setProfile(user.id, setProfileDto);
  }

  @Patch('profile')
  @UseInterceptors(FilesInterceptor('image', 1, setProfileConfig))
  async editProfile(
    @User() user: UserEntity,
    @UploadedFiles(ImageFilePipe) imgUrls: string[],
    @Body() editProfileDto: EditProfileDto,
  ) {
    return await this.userService.editProfile(user.id, editProfileDto, imgUrls);
  }

  @Patch('account')
  async setAccount(
    @User() user: UserEntity,
    @Body() editAccountDto: EditAccountDto,
  ) {
    return await this.userService.editAccount(user.id, editAccountDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req, @Res() res) {
    return this.userService.googleLoginCallback(req, res);
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Req() req) {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req, @Res() res) {
    return this.userService.kakaoLoginCallback(req, res);
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    try {
      req.logout(()=>{
        res.send({
            success: true,
            timestamp: new Date().toISOString(),
          });
      })
      // res.clearCookie('connect.sid', { httpOnly: true });
      // return res.send({
      //   success: true,
      //   timestamp: new Date().toISOString(),
      // });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get('posts')
  async getMyPosts(@User() user: UserEntity) {
    return await this.userService.getMyPosts(user.id);
  }

  @Get('sanchaeks')
  async getMySanchaeks(@User() user: UserEntity) {
    return await this.userService.getMySanchaeks(user.id)
  }

  @Get('liked-posts')
  async getLikedPosts(@User() user: UserEntity) {
    return await this.userService.getLikedPosts(user.id);
  }

  @Get('commented-posts')
  async getCommentedPosts(@User() user: UserEntity) {
    return await this.userService.getCommentedPosts(user.id);
  }

  @Delete('signout')
  async signout(@User() user: UserEntity) {
    return await this.userService.signout(user.id);
  }

  @Get(':userId')
  async getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUserProfile(userId);
  }



  @Get('session')
  async isLoggedIn(@User() user: UserEntity, @Req() req) {
    console.log(user);
    console.log(req.session);
  }
}
