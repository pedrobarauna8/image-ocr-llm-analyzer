import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LlmService } from './service/LlmService';
import { OcrService } from './service/OcrService';
import { PrismaService } from './service/PrismaService';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, OcrService, LlmService, PrismaService],
})
export class AppModule {}
