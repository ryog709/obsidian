# About-Skillセクション-HTML

## 概要
パララックス効果を使用した「手に職を持つこと」をテーマにしたセクション。背景画像のパララックスアニメーションを実装。

## 特徴
- パララックス効果（`js-about-skill`, `js-about-skill-bg`, `js-about-skill-title-1`, `js-about-skill-title-2`, `js-about-skill-text`）
- レスポンシブ対応（`<br class="pc-none" />`でPC表示時の改行制御）
- 画像の遅延読み込み

## HTMLコード

```html
<section class="about-skill js-about-skill">
  <div class="about-skill__bg">
    <div class="about-skill__bg-inner js-about-skill-bg">
      <div class="about-skill__inner inner">
        <div class="about-skill__parallax-item">
          <div class="about-skill__parallax-title about-skill__parallax-title--1 js-about-skill-title-1">
            <img src="./assets/images/about/about-parallax-01.webp?v=1.0.1" alt="手に職≠最強" width="1200" height="550" loading="lazy" />
          </div>
          <div class="about-skill__parallax-title about-skill__parallax-title--2 js-about-skill-title-2">
            <img src="./assets/images/about/about-parallax-02.webp?v=1.0.1" alt="手に職≠最強" width="1200" height="550" loading="lazy" />
          </div>
          <p class="about-skill__parallax-text js-about-skill-text">
            手に職を持つこと。<br class="pc-none" />それは、手に資格を有すること。<br />
            手に職を持つこと。<br class="pc-none" />それは、見えない価値を手に宿すこと。<br />
            手に職を持つこと。<br class="pc-none" />それは、一生の誇りであること。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 構造のポイント
- パララックス効果用の複数レイヤー構造
- 背景画像を2枚重ねて動きを演出（`about-skill__parallax-title--1`, `about-skill__parallax-title--2`）
- JavaScriptでスクロール位置に応じて各要素を動かす想定
- PC表示時のみ改行を制御（`pc-none`クラス）

## JavaScript連携
以下のクラスがJavaScriptで制御される想定：
- `js-about-skill`: セクション全体のスクロール検知
- `js-about-skill-bg`: 背景のパララックス
- `js-about-skill-title-1`: 1枚目の背景画像
- `js-about-skill-title-2`: 2枚目の背景画像
- `js-about-skill-text`: テキストのパララックス

## 使用例
- 企業理念を表現するセクション
- パララックス効果を使った視覚的な訴求
- スクロールアニメーションが必要なサイト

## 関連
- [[サービスリストセクション-HTML]]
- [[マウスストーカーボタン-CSS実装]]

#html #css #parallax #animation #bem #responsive-design

