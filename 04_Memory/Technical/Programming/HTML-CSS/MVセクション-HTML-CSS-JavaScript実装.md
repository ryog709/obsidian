# MV セクション-HTML-CSS-JavaScript 実装

## 概要

トップページのメインビジュアル（MV）セクションの実装。タイトルとテキストのアニメーション、複数の背景画像のマスク処理、GSAP を使用した順次アニメーション機能を含む。

## 内容

MV セクションは、画面全体に表示されるメインビジュアルエリア。タイトルとキャッチコピーが配置され、背景には複数の画像がマスク処理されて配置される。GSAP を使用して、テキストと画像を順次アニメーション表示する機能を実装。

## コードスニペット

### HTML

```html
<section class="mv">
  <div class="mv__inner">
    <div class="mv__title-wrapper">
      <h1 class="mv__title mv__anime-01">
        <span class="sr-only">手に職≠最強</span>
        <img src="./assets/images/top/mv-title.svg" alt="手に職≠最強" />
      </h1>
      <p class="mv__text mv__anime-02">
        必要なのは、学歴でも肩書きでもない。<br />
        "手に職"がある限り、人生に武器がある。<br />
        手に職を持つ者たちが集う場所、それがMiraitect。
      </p>
    </div>
  </div>

  <div class="mv__img-sp">
    <img src="./assets/images/top/mv-sp.webp" alt="" />
  </div>

  <div class="mv__img-wrapper">
    <div class="mv__img mv__img-01">
      <img src="./assets/images/top/mv-01.webp" alt="" />
    </div>
    <div class="mv__img mv__img-02">
      <img src="./assets/images/top/mv-02.webp" alt="" />
    </div>
    <div class="mv__img mv__img-03">
      <img src="./assets/images/top/mv-03.webp" alt="" />
    </div>
  </div>
</section>
```

### CSS

```css
.mv {
  position: relative;
  height: 100svh;
  max-height: rem(1080);

  @include mq("md") {
    padding-block: rem(20);
  }
}

.mv__inner {
  position: relative;
  max-width: rem(1855);
  width: 100%;
  height: 100%;
  margin-inline: auto;

  @include mq("md") {
  }
}

.mv__title-wrapper {
  position: absolute;
  bottom: rem(80);
  left: 0;
  z-index: 1;

  @include mq("md") {
    bottom: auto;
    top: rem(150);
    top: 60%;
    transform: translateY(-50%);
    left: rem(10);
  }
}

.mv__title {
  max-width: rem(735);
  width: 100%;
  filter: drop-shadow(0 0 10px rgba(#0f1010, 1));

  @include mq("md") {
    max-width: rem(450);
    width: 80%;
    z-index: 1;
  }
}

.mv__text {
  font-size: rem(22);
  font-family: $gen;
  font-weight: $bold;
  color: $white;
  line-height: calc(34 / 22);
  letter-spacing: 0.075em;
  margin-top: rem(100);
  padding-left: rem(50);

  @include mq("md") {
    font-size: maxrem(16);
    padding-left: rem(15);
  }
}

.mv__img-sp {
  display: none;

  @include mq("md") {
    display: block;
    position: absolute;
    top: rem(120);
    right: 0;
    width: 125%;
  }
}

.mv__img-sp img {
}

.mv__img-wrapper {
  position: absolute;
  top: rem(20);
  bottom: rem(20);
  right: 0;
  max-width: calc((1402 / 1920) * 100vw);
  width: 100%;
  height: calc(100% - rem(40));
  aspect-ratio: 1402 / 1040;

  @include mq("xl") {
    max-width: rem(1402);
  }

  @include mq("md") {
    display: none;
  }
}

.mv__img {
  height: 100%;
}

.mv__img-01 {
  position: absolute;
  top: 0;
  left: 0;
  mask-image: url("../../assets/images/top/mv-mask-01.webp");
  mask-size: cover;
  mask-repeat: no-repeat;
  max-width: calc((868 / 1920) * 100vw);
  width: 100%;
  height: 100%;
  overflow: hidden;

  @include mq("xl") {
    max-width: rem(868);
  }
}

.mv__img-02 {
  position: absolute;
  top: 0;
  left: calc((388 / 1920) * 100vw);
  mask-image: url("../../assets/images/top/mv-mask-01.webp");
  mask-size: cover;
  mask-repeat: no-repeat;
  max-width: calc((868 / 1920) * 100vw);
  width: 100%;
  height: 100%;
  overflow: hidden;

  @include mq("xl") {
    left: rem(388);
    max-width: rem(868);
  }
}

.mv__img-03 {
  position: absolute;
  top: 0;
  right: 0;
  mask-image: url("../../assets/images/top/mv-mask-02.webp");
  mask-size: cover;
  mask-repeat: no-repeat;
  max-width: calc((626 / 1920) * 100vw);
  width: 100%;
  height: 100%;
  overflow: hidden;

  @include mq("xl") {
    max-width: rem(626);
  }
}

.mv__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
  opacity: 0; // MVアニメーション発火のため
}
```

### JavaScript

```javascript
//-----------------------------------------------
// MVアニメーション（GSAP）
//-----------------------------------------------
function startMVAnimation() {
  const mv01 = document.querySelector(".mv__anime-01");
  const mv02 = document.querySelector(".mv__anime-02");
  const mvImgs = document.querySelectorAll(".mv__img img"); // ← 追加

  const tl = gsap.timeline();

  // テキストアニメーション（既存）
  if (mv01) {
    tl.fromTo(
      mv01,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" }
    );
  }

  if (mv02) {
    tl.fromTo(
      mv02,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" },
      "+=0.3"
    );
  }

  // --------------------------------------------
  // 追加：mv__img img の順次アニメーション
  // --------------------------------------------
  mvImgs.forEach((img, index) => {
    tl.fromTo(
      img,
      {
        x: 100,
        y: -100,
        scale: 1.1,
        autoAlpha: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1.0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      `imageStart+=${index * 0.3}` // ← タイムラインの "固定位置" を基準に遅延
    );
  });
}
```

## 次アクション

- [ ] 関連ノートにリンク
- [ ] 必要に応じて Memory Note に変換（コードスニペットの場合）
- [ ] 04_Memory/Technical/Programming/HTML-CSS/ への移動を検討

#inbox #html-snippet #css-snippet #javascript-snippet #web-development #gsap #animation #mv-section
