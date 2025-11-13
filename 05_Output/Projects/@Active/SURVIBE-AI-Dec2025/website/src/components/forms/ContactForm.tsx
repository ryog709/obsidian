'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';
import { ContactResponse, CourseType } from '@/types/contact';
import { courses } from '@/lib/constants/courses';

const contactFormSchema = z.object({
  name: z.string().min(1, 'お名前は必須です').max(100, 'お名前は100文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  course: z.enum(['prompt-basics', 'ai-development'], {
    errorMap: () => ({ message: 'コースを選択してください' }),
  }),
  message: z.string().max(1000, 'メッセージは1000文字以内で入力してください').optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      course: 'prompt-basics' as CourseType,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ContactResponse = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message,
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'お問い合わせの送信に失敗しました。',
        });
      }
    } catch (error: unknown) {
      console.error('Contact form error:', error);
      
      setSubmitStatus({
        type: 'error',
        message: 'ネットワークエラーが発生しました。しばらく時間をおいて再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #fafafa 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            component="div"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#3b82f6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            📝 お問い合わせ
          </Typography>
          
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 800,
              mb: 4,
              background: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            無料相談・お申し込み
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              color: '#64748b',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            ご不明な点やご相談がありましたら、お気軽にお問い合わせください。
            専任スタッフが丁寧にご対応させていただきます。
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="start">
          <Grid item xs={12} md={6}>
            <Box
              className="animate-fade-in"
              sx={{
                background: 'white',
                borderRadius: 3,
                p: 4,
                border: '1px solid #e2e8f0',
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                📋 申込ステップ
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    1
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                      フォーム入力
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      必要事項を入力して送信
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    2
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                      自動返信メール
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      詳細情報を記載したメールをお送り
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    3
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#0f172a' }}>
                      公式サイトで申込
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      Peatixにて正式にお申し込み
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#0f172a' }}>
                  🎁 特典
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <Typography variant="body2" component="li" sx={{ mb: 1, color: '#64748b' }}>
                    無料個別相談（30分）
                  </Typography>
                  <Typography variant="body2" component="li" sx={{ mb: 1, color: '#64748b' }}>
                    学習プランの提案
                  </Typography>
                  <Typography variant="body2" component="li" sx={{ color: '#64748b' }}>
                    卒業生との交流会案内
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              className="animate-slide-up"
              sx={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: 3,
                p: 4,
                boxShadow: 'none',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>
                お問い合わせフォーム
              </Typography>

              {submitStatus && (
                <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
                  {submitStatus.message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register('name')}
                  label="お名前"
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  {...register('email')}
                  label="メールアドレス"
                  type="email"
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  {...register('course')}
                  label="興味のあるコース"
                  select
                  fullWidth
                  required
                  error={!!errors.course}
                  helperText={errors.course?.message}
                  defaultValue="prompt-basics"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.title}（¥{course.price.toLocaleString()}）
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...register('message')}
                  label="メッセージ（任意）"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="ご質問やご要望などがございましたら、ご自由にお書きください。"
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                    color: 'white',
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.5)',
                    },
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      送信中...
                    </>
                  ) : (
                    '無料相談を申し込む'
                  )}
                </Button>

                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: '#64748b' }}>
                  送信後、自動返信メールで詳細をご案内いたします
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

