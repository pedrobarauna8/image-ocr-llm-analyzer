import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async transcript(file: Express.Multer.File) {
    const languages = 'eng+por';
    const { data } = await Tesseract.recognize(file.buffer, languages);
    return data.text;
  }
}
