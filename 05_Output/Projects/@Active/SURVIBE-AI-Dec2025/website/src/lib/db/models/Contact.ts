import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  course: 'prompt-basics' | 'ai-development';
  message?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'お名前は必須です'],
      trim: true,
      maxlength: [100, 'お名前は100文字以内で入力してください'],
    },
    email: {
      type: String,
      required: [true, 'メールアドレスは必須です'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, '有効なメールアドレスを入力してください'],
    },
    course: {
      type: String,
      required: [true, 'コース選択は必須です'],
      enum: {
        values: ['prompt-basics', 'ai-development'],
        message: '有効なコースを選択してください',
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'メッセージは1000文字以内で入力してください'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// モデルが既に存在する場合はそれを使用、存在しない場合は新規作成
const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

