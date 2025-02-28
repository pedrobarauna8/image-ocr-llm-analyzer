import { Injectable } from '@nestjs/common';
import { OcrService } from './service/OcrService';
import { LlmService } from './service/LlmService';
import { PrismaService } from './service/PrismaService';

@Injectable()
export class AppService {
  constructor(
    private readonly ocrService: OcrService,
    private readonly llmService: LlmService,
    private readonly prismaService: PrismaService,
  ) {}

  async processImage(file: Express.Multer.File, user: any): Promise<string> {
    const text = await this.ocrService.transcript(file);
    const description = await this.llmService.explainText(text);
    return this.prismaService.save(text, file, description, user.userId);
  }

  async listFiles(userId: string) {
    return this.prismaService.findAll(userId);
  }

  async downloadFile(id: string) {
    return this.prismaService.findById(id);
  }
}
