import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PrismaService {
  async save(
    text: string,
    file: Express.Multer.File,
    description: string | null,
    userId: string,
  ) {
    const entity = await prisma.ocrResult.create({
      data: {
        text: text,
        filename: file.originalname,
        mimetype: file.mimetype,
        data: file.buffer,
        context: description || '',
        userId: userId,
      },
    });
    return entity.id;
  }

  async findAll(userId: string) {
    return prisma.ocrResult.findMany({
      where: { userId: userId },
      select: {
        id: true,
        filename: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.ocrResult.findFirst({
      where: {
        id: id,
      },
    });
  }
}
