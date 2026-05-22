import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, concepts, summary, imageBase64, mimeType, problemCount } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${imageBase64}`, detail: 'high' },
            },
            {
              type: 'text',
              text: `중학교 ${subject} 과목, 주제: "${topic}", 핵심 개념: ${concepts.join(', ')}

위 이미지의 문제와 유사한 문제 ${problemCount}개와, 단원 핵심 개념 빈칸 채우기 문제 10개를 만들어주세요.

다음 JSON 형식으로만 응답하세요:
{
  "problems": [
    {
      "question": "문제 내용",
      "options": ["선택지1", "선택지2", "선택지3", "선택지4", "선택지5"],
      "answer": "정답 (객관식이면 번호+내용, 주관식이면 답)",
      "explanation": "해설을 2~3문장으로 쉽고 친절하게"
    }
  ],
  "blankProblems": [
    {
      "sentence": "___는 식물이 빛에너지를 이용해 포도당을 합성하는 과정이다.",
      "blank": "빈칸에 들어갈 단어",
      "answer": "광합성"
    }
  ]
}

- problems: 업로드한 문제와 유사한 유형으로 ${problemCount}개 생성 (객관식 5지선다 권장)
- blankProblems: 단원 핵심 개념 관련 빈칸 채우기 정확히 10개 생성, ___ 로 빈칸 표시
- JSON 이외의 다른 텍스트는 절대 포함하지 마세요.`,
            },
          ],
        },
      ],
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content ?? '{}';
    const cleaned = content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('generate error:', err);
    return NextResponse.json({ error: '문제 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
