# サービスリストセクション-HTML

## 概要
カテゴリー別に分類されたサービスリストを表示するセクション。12種類のサービスを3つのカテゴリー（築く・造る・支える）に分類。

## 特徴
- カテゴリー別フィルタリング（`data-category`属性）
- 画像の遅延読み込み（`loading="lazy"`）
- アクセシビリティ対応（適切なalt属性）
- JavaScript連携（`js-service-list`, `js-service-item`, `js-mask`）

## HTMLコード

```html
<section class="service-list js-service-list">
  <div class="service-list__inner inner">
    <div class="service-list__container">
      <div class="service-list__category-label js-fade-op">
        <span class="service-list__category-text">
          <span class="service-list__category-text-base">築く</span>
          <span class="service-list__category-text-create js-category-create">×造る</span>
          <span class="service-list__category-text-support js-category-support">×支える</span>
        </span>
      </div>
      <ul class="service-list__items">
        <!-- 築く（build）カテゴリー -->
        <li class="service-list__item js-service-item js-mask" data-category="build">
          <div class="service-list__content">
            <h3 class="service-list__title">瓦屋根</h3>
            <div class="service-list__text-area" data-line="yellow">
              <p class="service-list__text">瓦を組み上げ、<br />雨や風から家を守り続ける。</p>
              <p class="service-list__description">
                内容が入ります。ダミーテキストダミーテキストダミーテキスト...
              </p>
            </div>
          </div>
          <div class="service-list__image">
            <img src="./assets/images/service/service-img-01.webp?v=1.0.1" width="600" height="400" loading="lazy" alt="瓦を組み上げる職人の手元" />
          </div>
        </li>
        <!-- 他のサービス項目も同様の構造 -->
      </ul>
    </div>
  </div>
</section>
```

## サービス一覧

### 築く（build）カテゴリー
1. 瓦屋根 - `data-line="yellow"`
2. 外壁 - `data-line="ocher"`
3. 板金 - `data-line="vermilion"`
4. 塗装 - `data-line="red"`
5. 防水 - `data-line="reddish-purple"`
6. エクステリア - `data-line="purple"`

### 造る（create）カテゴリー
7. 大工 - `data-line="Yellow-green"`
8. 左官 - `data-line="green"`
9. 軽天 - `data-line="lime-green"`

### 支える（support）カテゴリー
10. 住宅設備 - `data-line="light-blue"`
11. 断熱施工 - `data-line="blue"`
12. 太陽光 - `data-line="navy-blue"`

## 構造のポイント
- 各サービス項目は`<li>`要素で構成
- `data-category`属性でカテゴリーを指定
- `data-line`属性でカラーラインを指定（CSSで使用）
- 画像はWebP形式で最適化
- 画像URLにバージョンクエリ（`?v=1.0.1`）を付与

## 使用例
- サービス紹介ページ
- ポートフォリオサイト
- カテゴリー別フィルタリングが必要なサイト

## 関連
- [[ヘッダーナビゲーション-レスポンシブ対応]]
- [[About-Skillセクション-HTML]]

#html #css #service-list #bem #responsive-design #accessibility

