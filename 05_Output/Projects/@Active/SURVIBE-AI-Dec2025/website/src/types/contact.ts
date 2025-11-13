export type CourseType = 'prompt-basics' | 'ai-development';

export interface ContactFormData {
  name: string;
  email: string;
  course: CourseType;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
  };
}

