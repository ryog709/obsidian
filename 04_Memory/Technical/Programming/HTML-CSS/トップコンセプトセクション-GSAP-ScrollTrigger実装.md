# トップコンセプトセクション-GSAP-ScrollTrigger 実装

## 概要

トップページのコンセプトセクションの実装。GSAP ScrollTrigger を使用したピン留め＋クロスフェードアニメーション機能を含む。複数のセクションをスクロールに連動して順次表示する仕組み。

## 内容

コンセプトセクションは、複数のピン留めセクション（pin-section）で構成され、スクロールに連動してクロスフェードアニメーションで切り替わる。GSAP ScrollTrigger を使用して、スクロール位置に応じて各セクションをピン留めし、フェードイン・フェードアウトを実現している。

## コードスニペット

### HTML

```html
<section
  class="top-concept js-hover-section"
  data-link=""
  data-label="shokunin"
  data-type="shokunin"
  id="top-concept"
>
  <div class="top-concept__pin">
    <div
      class="top-concept__pin-section top-concept__pin-section--01 is-active"
    >
      <div class="top-concept__pin-section-img">
        <img src="./assets/images/top/concept-01.webp" alt="" />
      </div>

      <div class="top-concept__inner">
        <div class="top-concept__text-wrapper">
          <div class="top-concept__title top-concept__title-01">
            <img
              src="./assets/images/top/concept-text-01.webp"
              alt="職人の手には、見えない武器がある。技術という牙、経験という爪"
            />
          </div>
        </div>

        <div class="top-concept__btn">
          <a class="btn btn-02" href="interview-detail.html"
            ><span class="btn__text btn__text-02">shokunin</span></a
          >
        </div>
      </div>
    </div>

    <div class="top-concept__pin-section top-concept__pin-section--02">
      <div class="top-concept__pin-section-img">
        <img src="./assets/images/top/concept-02.webp" alt="" />
      </div>

      <div class="top-concept__inner">
        <div class="top-concept__text-wrapper">
          <div class="top-concept__title top-concept__title-02">
            <img
              src="./assets/images/top/concept-text-02.webp"
              alt="職人の心には、燃える情熱がある。技術という牙、経験という爪"
            />
          </div>
          <p class="top-concept__text">
            現場は、戦場だ。<br />
            天候、工期、安全、品質。<br />
            あらゆる困難が、職人に牙を向く。<br />
            でも、もう素手で戦う必要はない。<br />
            技術という装甲を身にまとい、
          </p>
        </div>

        <div class="top-concept__btn">
          <a class="btn btn-02" href="interview-detail.html"
            ><span class="btn__text btn__text-02">shokunin</span></a
          >
        </div>
      </div>
    </div>

    <div class="top-concept__pin-section top-concept__pin-section--03">
      <div class="top-concept__pin-section-img">
        <img src="./assets/images/top/concept-03.webp" alt="" />
      </div>

      <div class="top-concept__inner">
        <div class="top-concept__text-wrapper">
          <div class="top-concept__title top-concept__title-03">
            <img
              src="./assets/images/top/concept-text-03.webp"
              alt="職人の頭には、冷静な知恵がある。技術という牙、経験という爪"
            />
          </div>
          <p class="top-concept__text">
            現場は、戦場だ。<br />
            天候、工期、安全、品質。<br />
            あらゆる困難が、職人に牙を向く。<br />
            でも、もう素手で戦う必要はない。<br />
            技術という装甲を身にまとい、<br />
            経験という武器を装備し、<br />
            チームワークという戦術で現場を制圧する。<br />
            見えない武器を、見える力に。<br />
            内なる強さを、外なるパワーに。<br />
            Miraitectで、君も最強の職人戦士になれ。
          </p>
        </div>

        <div class="top-concept__btn">
          <a class="btn btn-02" href="interview-detail.html"
            ><span class="btn__text btn__text-02">shokunin</span></a
          >
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS

```css
.top-concept {
  position: relative;
  height: 100lvh;
  overflow: hidden;
  background-color: $black_1a1c1c;
}

.top-concept__pin {
  height: 100lvh;
  position: relative;
}

.top-concept__pin-section {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 0;
}

.top-concept__pin-section.is-active {
  opacity: 1;
}

.top-concept__pin-section-img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -5;

  @include mq("md") {
    opacity: 0.8;
  }
}

.top-concept__pin-section-img img {
  width: max-content;
  height: 100lvh;
  object-fit: cover;
}

.top-concept__inner {
  position: relative;
  width: 100%;
  max-width: calc((1800 / 1920) * 100vw);
  height: 100%;
  padding-inline: calc((25 / 1920) * 100vw);
  margin-inline: auto;
  z-index: 10;

  @include mq("md") {
    padding-inline: 0;
  }
}

.top-concept__text-wrapper {
  margin-top: rem(191);

  @include mq("md") {
    margin-top: rem(100);
  }
}

.top-concept__title {
  width: 100%;
  max-width: rem(834);

  @include mq("md") {
    max-width: rem(350);
  }
}

.top-concept__text {
  font-size: rem(20);
  font-family: $gen;
  font-weight: $regular;
  color: $white;
  line-height: calc(34 / 20);
  letter-spacing: 0.075em;
  margin-top: rem(65);

  @include mq("md") {
    font-size: maxrem(16);
    margin-top: rem(40);
  }
}

.top-concept__btn {
  display: none;

  @media screen and (max-width: 1099px) {
    display: block;
    position: absolute;
    bottom: rem(50);
    right: rem(50);
    max-width: rem(250);
    width: 100%;
    z-index: 11;
  }

  @include mq("md") {
    right: auto;
    position: absolute;
    bottom: rem(80);
    left: 50%;
    transform: translateX(-50%);
    max-width: rem(180);
    text-align: center;
  }
}
```

### JavaScript

```javascript
//-----------------------------------------------
// トップページ｜ピン留め＋クロスフェード
//-----------------------------------------------
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".top-concept__pin-section");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".top-concept",
    start: "top top",
    end: () => "+=" + window.innerHeight * sections.length,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});

const overlap = 0.3;

sections.forEach((section, index) => {
  const isFirst = index === 0;
  const isLast = index === sections.length - 1;

  tl.fromTo(
    section,
    { autoAlpha: isFirst ? 1 : 0 },
    { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
    index * (1 - overlap)
  );

  if (!isLast) {
    tl.to(
      section,
      { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" },
      index * (1 - overlap) + 0.5
    );
  }
});
```

## 次アクション

- [ ] 関連ノートにリンク
- [ ] 必要に応じて Memory Note に変換（コードスニペットの場合）
- [ ] 04_Memory/Technical/Programming/HTML-CSS/ への移動を検討

#inbox #html-snippet #css-snippet #javascript-snippet #web-development #gsap #scrolltrigger #animation
