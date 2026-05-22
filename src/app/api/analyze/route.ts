import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const subject = formData.get('subject') as string;

    if (!file) return NextResponse.json({ error: '이미지가 없습니다.' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const mimeType = file.type;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${base64}`, detail: 'high' },
            },
            {
              type: 'text',
              text: `이 이미지는 중학교 ${subject} 문제입니다. 다음 JSON 형식으로만 응답해주세요:
{
  "topic": "문제의 핵심 주제 (예: 광합성, 이차방정식, 고려시대 등)",
  "concepts": ["관련 개념1", "관련 개념2", "관련 개념3", "관련 개념4", "관련 개념5"],
  "summary": "이 문제와 관련된 단원의 핵심 개념을 3~4문장으로 쉽고 친절하게 설명해주세요."
}
JSON 이외의 다른 텍스트는 절대 포함하지 마세요.`,
            },
          ],
        },
      ],
      max_tokens: 800,
    });

    const content = response.choices[0].message.content ?? '{}';
    const cleaned = content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ subject, ...parsed });
  } catch (err) {
    console.error('analyze error:', err);
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
