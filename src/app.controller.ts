import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { User } from './auth/user.decorator';
import { UploadFileResponseDto } from './dto/UploadFileResponseDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user: any,
  ) {
    const id = await this.appService.processImage(file, user);
    return new UploadFileResponseDto(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listFiles(@User() user: any) {
    return this.appService.listFiles(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('download/:id')
  async downloadFile(@Param('id') id: string) {
    return this.appService.downloadFile(id);
  }
}
