'use client';

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

export default function Hero() {

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="animate-fade-in">
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
                🚀 12月ブートキャンプ 第2期生募集
              </Typography>
              
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SURVIBE AI
              </Typography>
              
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  fontWeight: 600,
                  mb: 4,
                  color: '#64748b',
                  lineHeight: 1.4,
                }}
              >
                実務に直結する「集中型」生成AI講座
                <br />
                <Box component="span" sx={{ color: '#3b82f6' }}>
                  1ヶ月で学ぶ → 作る → 成果に活かす
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  mb: 6,
                  color: '#475569',
                  lineHeight: 1.7,
                }}
              >
                多くのスクールが座学中心で実務に落とし込むまで時間がかかる一方、
                本コースは「1ヶ月で学ぶ → 作る → 成果に活かす」を実現する実践型プログラムです。
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 6 }}>
                <Button
                  component={Link}
                  href="#courses"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
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
                  コースを見る
                </Button>
                <Button
                  component={Link}
                  href="#contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: '#3b82f6',
                    color: '#3b82f6',
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderColor: '#2563eb',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  無料相談する
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    50,000円〜
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    第1期特別価格
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    定員10名
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    先着順
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              className="animate-slide-up"
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                  opacity: 0.1,
                  borderRadius: 4,
                  transform: 'rotate(3deg)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: 4,
                  p: 4,
                  border: '1px solid #e2e8f0',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                  📅 開催概要
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
                      期間
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                      2025年12月1日〜12月31日
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
                      形式
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                      オンライン（Discord + Zoom）
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 0.5 }}>
                      申込締切
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#ef4444' }}>
                      2025/11/30まで
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

