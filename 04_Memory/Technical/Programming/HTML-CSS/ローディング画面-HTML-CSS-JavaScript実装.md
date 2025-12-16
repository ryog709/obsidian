# ローディング画面-HTML-CSS-JavaScript 実装

## 概要

ページ読み込み時に表示されるローディング画面の実装。複数の画像を順次フェードイン表示し、全て表示後にフェードアウトするアニメーション機能を含む。

## 内容

ローディング画面は、ページ読み込み時に固定表示され、複数の画像を順次表示する仕組み。全ての画像が表示された後、フェードアウトして非表示になる。ロゴ画像は中央に配置され、背景画像は画面全体に表示される。

## コードスニペット

### HTML

```html
<div class="loading" id="js-loading">
  <div class="loading__img loading__img-01">
    <img src="./assets/images/top/loading-01.webp" alt="" />
  </div>
  <div class="loading__logo loading__img-01">
    <img src="./assets/images/common/logo-02.svg" alt="" />
  </div>
  <div class="loading__img loading__img-02">
    <img src="./assets/images/top/loading-02.webp" alt="" />
  </div>
  <div class="loading__img loading__img-03">
    <img src="./assets/images/top/loading-03.webp" alt="" />
  </div>
</div>
```

### CSS

```css
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100lvh;
  z-index: 1000;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  background-color: $black_0f1010;
}

.loading__img {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.loading__img.is-active {
  opacity: 1;
}

.loading-fadeout {
  opacity: 0;
}

.loading-hidden {
  display: none;
}

.loading__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: rem(426);
  width: 100%;
  aspect-ratio: 426 / 576;

  @include mq("md") {
    width: 80%;
  }
}

.loading__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.loading__img {
  width: 100%;
  min-height: 100svh;
  min-height: 100lvh;
}

.loading__img img {
  width: 100%;
  height: 100%;
  min-height: 100svh;
  min-height: 100lvh;
  object-fit: cover;
}

.loading__img-01 {
  opacity: 1;
}
```

### JavaScript

```javascript
//-----------------------------------------------
// ローディング
//-----------------------------------------------
function startLoadingSequence(loadingEl) {
  const images = document.querySelectorAll(".loading__img");
  let index = 0;

  // 1枚目を表示
  images[index].classList.add("is-active");

  const interval = setInterval(() => {
    index++;

    // まだ画像がある場合はそのまま次をフェードイン
    if (index < images.length) {
      images[index].classList.add("is-active");
    } else {
      clearInterval(interval);

      // すべて表示し終えたらフェードアウト
      finishLoading(loadingEl);
    }
  }, 1500);
}

//-----------------------------------------------
// ローディング全体をフェードアウト
//-----------------------------------------------
function finishLoading(el) {
  el.classList.add("loading-fadeout");

  el.addEventListener("transitionend", () => {
    el.classList.add("loading-hidden");
    bodyFixedOff();
    startMVAnimation();
  });
}
```

## 次アクション

- [ ] 関連ノートにリンク
- [ ] 必要に応じて Memory Note に変換（コードスニペットの場合）
- [ ] 04_Memory/Technical/Programming/HTML-CSS/ への移動を検討

#inbox #html-snippet #css-snippet #javascript-snippet #web-development #loading-animation
