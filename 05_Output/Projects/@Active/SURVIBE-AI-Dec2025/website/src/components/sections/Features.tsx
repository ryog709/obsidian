'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const features = [
  {
    icon: '🎯',
    title: '実践ファースト',
    description: '座学は必要最低限、初日から実際に手を動かして学ぶ実践型カリキュラム',
    details: [
      '主要ツールを触りながら実践',
      '毎週公開・改善を繰り返す',
      '自分専用のAI Botを完成'
    ]
  },
  {
    icon: '🤖',
    title: 'AI活用学習',
    description: '生成AIを学習パートナーとして活用、挫折しにくい環境を提供',
    details: [
      'AIにPMとして指示出し',
      '環境構築も徹底サポート',
      'エラー解決を一緒に考える'
    ]
  },
  {
    icon: '👥',
    title: '少人数制',
    description: '定員10名の少人数制で、質問しやすく手厚いサポートを実現',
    details: [
      '講師との距離が近い',
      '仲間と一緒に成長',
      '個別フィードバック'
    ]
  },
  {
    icon: '📈',
    title: '実務直結',
    description: '学んだ知識をすぐに業務で活かせる実践的な内容に特化',
    details: [
      'ビジネスケーススタディ',
      '即戦力スキル習得',
      'ポートフォリオ完成'
    ]
  },
  {
    icon: '🔄',
    title: '継続的サポート',
    description: '6回チャレンジできる隔月開催で、継続的にスキルアップ',
    details: [
      '今後1年隔月で開催',
      'カリキュラムは随時アップデート',
      '卒業生も継続的にサポート'
    ]
  },
  {
    icon: '🏆',
    title: '成果物重視',
    description: '「学んだ知識を成果につなげる」ことを重視したプログラム',
    details: [
      '最終週に成果物を完成',
      '実務で使えるワークフロー',
      '自信を持って_deployできる'
    ]
  }
];

export default function Features() {
  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'white',
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
            ✨ 特徴
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
            なぜSURVIBE AIが選ばれるのか
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
            他のスクールとの違いは、1ヶ月で「学ぶ」から「作る」まで到達する実践型プログラム
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                className="card-hover animate-fade-in"
                sx={{
                  height: '100%',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  p: 3,
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    borderColor: '#3b82f6',
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '3rem',
                        lineHeight: 1,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#0f172a',
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: '#475569',
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    {feature.description}
                  </Typography>

                  <Box sx={{ borderTop: '1px solid #f1f5f9', pt: 3 }}>
                    {feature.details.map((detail, detailIndex) => (
                      <Box
                        key={detailIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 2,
                          '&:last-child': { mb: 0 },
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            mt: 0.5,
                            mr: 2,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            lineHeight: 1.6,
                          }}
                        >
                          {detail}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 8,
            p: 4,
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#0f172a',
            }}
          >
            これまでの参加者の7割が初心者
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              lineHeight: 1.7,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            周りの方々や講師が優しくサポートしていきますので、安心してご参加ください。
            経験問わず、一緒に成長していきましょう！
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
