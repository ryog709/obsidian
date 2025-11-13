import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Contact from '@/lib/db/models/Contact';
import { z } from 'zod';
import mongoose from 'mongoose';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前は必須です').max(100, 'お名前は100文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  course: z.enum(['prompt-basics', 'ai-development'], {
    errorMap: () => ({ message: '有効なコースを選択してください' }),
  }),
  message: z.string().max(1000, 'メッセージは1000文字以内で入力してください').optional(),
});

export async function POST(request: NextRequest) {
  try {
    // データベース接続
    await dbConnect();

    // リクエストボディを取得
    const body = await request.json();

    // バリデーション
    const validatedData = contactSchema.parse(body);

    // お問い合わせデータを保存
    const contact = new Contact({
      name: validatedData.name,
      email: validatedData.email,
      course: validatedData.course,
      message: validatedData.message,
      status: 'new',
    });

    await contact.save();

    return NextResponse.json(
      {
        success: true,
        message: 'お問い合わせを受け付けました。ありがとうございます。',
        data: {
          id: (contact._id as mongoose.Types.ObjectId).toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Zodバリデーションエラー
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: '入力内容に誤りがあります',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // その他のエラー
    return NextResponse.json(
      {
        success: false,
        message: 'お問い合わせの送信に失敗しました。しばらく時間をおいて再度お試しください。',
      },
      { status: 500 }
    );
  }
}

