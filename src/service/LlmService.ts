import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async explainText(text: string): Promise<string | null> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [
        {
          role: 'user',
          content:
            'Me explique em 1 paragráfo sobre o seguinte texto a seguir: ' +
            text,
        },
      ],
    });
    return completion.choices[0].message.content;
  }
}
