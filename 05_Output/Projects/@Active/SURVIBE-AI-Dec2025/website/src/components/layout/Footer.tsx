'use client';

import { Box, Container, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: '1.5rem',
                mb: 3,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SURVIBE AI
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, color: '#94a3b8' }}>
              実務に直結する「集中型」生成AI講座
              <br />
              1ヶ月で学ぶ → 作る → 成果に活かす
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              © 2025 SURVIBE AI. All rights reserved.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              コース
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link
                href="#courses"
                sx={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#3b82f6',
                  },
                }}
              >
                プロンプト基礎コース
              </Link>
              <Link
                href="#courses"
                sx={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#3b82f6',
                  },
                }}
              >
                AI共同開発コース
              </Link>
              <Link
                href="#features"
                sx={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#3b82f6',
                  },
                }}
              >
                特徴
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              サポート
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Link
                href="#contact"
                sx={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#3b82f6',
                  },
                }}
              >
                お問い合わせ
              </Link>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                運営: RIDE ON AI｜生成AI検証コミュニティ
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                  開催期間
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  2025年12月1日〜12月31日
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid #334155',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            これまでの参加者の7割が初心者です。経験問わず、一緒に成長していきましょう！
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
