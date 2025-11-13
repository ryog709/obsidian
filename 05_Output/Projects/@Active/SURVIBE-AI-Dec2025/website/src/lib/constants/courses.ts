export interface CourseInfo {
  id: 'prompt-basics' | 'ai-development';
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  schedule: string;
  capacity: number;
  deadline: string;
  description: string;
  features: string[];
  curriculum: {
    week: number;
    title: string;
    content: string[];
  }[];
}

export const courses: CourseInfo[] = [
  {
    id: 'prompt-basics',
    title: 'プロンプト基礎コース',
    subtitle: '実務に直結する「集中型」生成AI講座',
    price: 50000,
    duration: '2025年12月1日〜12月31日',
    schedule: '毎週日曜 9:00〜10:00',
    capacity: 10,
    deadline: '2025/11/30まで',
    description:
      '多くのスクールが座学中心で実務に落とし込むまで時間がかかる一方、本コースは「1ヶ月で学ぶ → 作る → 成果に活かす」を実現する実践型プログラムです。',
    features: [
      '1ヶ月で「学ぶ」から「作る」まで到達',
      '座学は必要最低限、すぐ業務で使える内容に集中',
      '主要ツールを触りながら実践',
      '最終週には自分専用のAI Botや業務改善ワークフローを完成',
    ],
    curriculum: [
      {
        week: 1,
        title: 'プロンプト基礎',
        content: [
          'ChatGPT, Claude, Google AI Studio, NotebookLM, genspark, gamma など主要ツール網羅',
        ],
      },
      {
        week: 2,
        title: '画像生成AI基礎',
        content: [],
      },
      {
        week: 3,
        title: 'Cursorでの業務改善',
        content: [],
      },
      {
        week: 4,
        title: 'Obsidian x Cursorビジネス活用',
        content: ['自分専用のAI Botや業務改善ワークフローを完成'],
      },
    ],
  },
  {
    id: 'ai-development',
    title: 'AI共同開発コース',
    subtitle: 'バイブコーディングブートキャンプ',
    price: 100000,
    duration: '2025年12月1日〜12月31日',
    schedule: '毎週日曜 10:00〜12:00',
    capacity: 10,
    deadline: '2025/11/30まで',
    description:
      '「なんか動いた」から「だから動いた」へ。見本動画を見ながらアプリを作成し、毎週公開・改善を繰り返す4週間。',
    features: [
      '実践ファースト：初日からアプリを公開',
      'AI活用：生成AIにPMとして指示出し',
      '少人数制：定員10名、質問しやすい環境',
    ],
    curriculum: [
      {
        week: 1,
        title: 'LP/HP：要件・設計 → 初日デプロイ／フォーム・計測',
        content: [],
      },
      {
        week: 2,
        title: 'CRUD：投稿/編集/削除/一覧・バリデーション・API・本番ビルド',
        content: [],
      },
      {
        week: 3,
        title: '会員制：サインアップ/ログイン、プロフィール、画像、検索、通知',
        content: [],
      },
      {
        week: 4,
        title: 'オーナー管理：管理画面、権限、分析、エラーログ、運用設計',
        content: [],
      },
    ],
  },
];

export const getCourseById = (id: CourseInfo['id']): CourseInfo | undefined => {
  return courses.find((course) => course.id === id);
};

