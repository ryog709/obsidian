'use client';

import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { courses } from '@/lib/constants/courses';

export default function CourseOverview() {
  return (
    <Box
      id="courses"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #fafafa 0%, #f8fafc 100%)',
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
            📚 コース一覧
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
            あなたのレベルに合わせて選べる2コース
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
            初心者から実践者まで、確実にスキルアップできる実践型プログラム
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} md={6} key={course.id}>
              <Card
                className="card-hover animate-fade-in"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  overflow: 'visible',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: course.id === 'prompt-basics' 
                      ? 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'
                      : 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                  },
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      label={course.id === 'prompt-basics' ? '🎯 初心者向け' : '🚀 実践者向け'}
                      sx={{
                        background: course.id === 'prompt-basics'
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'rgba(139, 92, 246, 0.1)',
                        color: course.id === 'prompt-basics' ? '#3b82f6' : '#8b5cf6',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        px: 2,
                        py: 0.5,
                      }}
                    />
                  </Box>

                  <Typography variant="h4" component="h3" gutterBottom fontWeight={700} sx={{ mb: 2 }}>
                    {course.title}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3, fontSize: '1.1rem' }}>
                    {course.subtitle}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                      ¥{course.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 600 }}>
                      第1期特別価格・定員{course.capacity}名
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.7 }}>
                    {course.description}
                  </Typography>

                  <Box sx={{ mb: 4, bgcolor: '#f8fafc', p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight={700} sx={{ mb: 2, color: '#0f172a' }}>
                      📋 開催概要
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>期間</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                          {course.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>全体集会</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                          {course.schedule}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>申込締切</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#ef4444' }}>
                          {course.deadline}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom fontWeight={700} sx={{ mb: 2, color: '#0f172a' }}>
                      ✨ 特徴
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {course.features.map((feature, index) => (
                        <Typography 
                          key={index} 
                          variant="body2" 
                          component="li" 
                          gutterBottom 
                          sx={{ 
                            mb: 1, 
                            color: '#475569',
                            '&::marker': { color: '#3b82f6' }
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    href="#contact"
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: course.id === 'prompt-basics'
                        ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                        : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        background: course.id === 'prompt-basics'
                          ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                          : 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.5)',
                      },
                    }}
                  >
                    このコースに申し込む
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

