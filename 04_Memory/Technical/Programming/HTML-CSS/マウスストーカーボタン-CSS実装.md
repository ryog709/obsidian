# マウスストーカーボタン-CSS 実装

## 概要

マウスカーソルに追従するストーカーボタンの CSS 実装。PC 表示のみで動作し、SP では非表示。背景のぼかし効果（backdrop-filter）とホバーアニメーションを実装。

## 特徴

- 固定位置（`position: fixed`）
- 背景のぼかし効果（`backdrop-filter: blur(6px)`）
- ホバー時のアニメーション
- レスポンシブ対応（1099px 以下で非表示）
- マスク画像を使用した矢印アイコン

## CSS コード

```css
/* ----- マウスストーカーボタン ここから ----- */

/* ベース */
.js-mouse-stalker.btn-stalker {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
  max-width: rem(300);
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 100vmax;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s;

  @media (max-width: 1099px) {
    display: none;
  }
}

/* active */
.js-mouse-stalker.btn-stalker.btn-stalker--active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.08);
  pointer-events: auto;
}

/* SP用（非表示） */
.btn-stalker-off {
  display: none;

  @media screen and (max-width: 1099px) {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: rem(300);
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 100vmax;
    backdrop-filter: blur(6px);
    transition: all 0.3s;
  }

  @include mq("md") {
    max-width: rem(200);
    margin-inline: auto;
  }
}

/* バリエーション：aboutページ用 */
.btn-stalker-off.btn-stalker-off--about {
  border: 1px solid $gray_707070;
  background-color: rgba(255, 255, 255, 0.08);
}

/* バリエーション：companyページ用 */
.btn-stalker-off.btn-stalker-off--company {
  border: 1px solid $gray_c9c9c9;
  background-color: rgba(255, 255, 255, 0.2);
}

/* テキストスタイル */
.btn-stalker__text,
.btn-stalker-off__text {
  position: relative;
  font-size: rem(30);
  font-family: $mon;
  font-weight: $bold;
  text-transform: capitalize;
  padding-bottom: rem(34);
  transition: all 0.3s;

  @include mq("md") {
    font-size: rem(24);
  }
}

/* aboutページ用テキスト */
.btn-stalker-off__text.btn-stalker-off__text--about,
.btn-stalker--about .btn-stalker__text {
  color: $white;
}

.btn-stalker-off__text.btn-stalker-off__text--about::before,
.btn-stalker--about .btn-stalker__text::before {
  background-color: $white;
}

/* companyページ用テキスト */
.btn-stalker-off__text.btn-stalker-off__text--company,
.btn-stalker--company .btn-stalker__text {
  color: $black_131313;
}

.btn-stalker-off__text.btn-stalker-off__text--company::before,
.btn-stalker--company .btn-stalker__text::before {
  background-color: $black_131313;
}

/* 矢印アイコン（マスク画像使用） */
.btn-stalker__text::before,
.btn-stalker-off__text::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  mask-image: url(../../assets/images/common/icon-arrow.svg);
  mask-size: contain;
  mask-repeat: no-repeat;
  background-color: $white;
  width: rem(20);
  aspect-ratio: 20 / 14;
  transition: all 0.3s;
}

/* ホバーエフェクト */
@media (any-hover: hover) {
  .js-mouse-stalker.btn-stalker:hover,
  .btn-stalker-off:hover {
    background-color: rgba($white, 0.5);
  }
}

/* ----- マウスストーカーボタン ここまで ----- */
```

## 技術的なポイント

### 1. 固定位置と中央配置

- `position: fixed`で画面に固定
- `transform: translate(-50%, -50%)`で中央配置
- JavaScript でマウス位置に追従させる想定

### 2. 背景のぼかし効果

- `backdrop-filter: blur(6px)`で背景をぼかす
- `background-color: rgba(255, 255, 255, 0.08)`で半透明の背景

### 3. 円形ボタン

- `border-radius: 100vmax`で完全な円形
- `aspect-ratio: 1 / 1`で正方形を維持

### 4. マスク画像

- `mask-image`プロパティで SVG アイコンを表示
- `background-color`でアイコンの色を制御

### 5. レスポンシブ対応

- 1099px 以下で PC 版を非表示
- SP 用の`.btn-stalker-off`クラスで別スタイルを提供

### 6. ページ別バリエーション

- `--about`モディファイアで about ページ用スタイル
- `--company`モディファイアで company ページ用スタイル

## 使用例

- ページトップへ戻るボタン
- 次のセクションへスクロールするボタン
- マウスカーソルに追従する UI 要素

## JavaScript 連携

以下のクラスが JavaScript で制御される想定：

- `js-mouse-stalker`: マウス位置に追従
- `btn-stalker--active`: 表示状態の切り替え
- `.btn-stalker__text`: テキストの動的変更

## 関連

- [[マウスストーカーボタン-HTML]]
- [[ヘッダーナビゲーション-レスポンシブ対応]]

#css #mouse-stalker #backdrop-filter #animation #bem #responsive-design #interaction
