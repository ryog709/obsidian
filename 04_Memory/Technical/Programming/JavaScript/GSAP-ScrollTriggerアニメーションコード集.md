# GSAP ScrollTrigger アニメーションコード集

## 概要

Web サイト用の GSAP ScrollTrigger を使ったアニメーション実装コード集。スムーススクロール、ドロワーメニュー、ヘッダー連動、各種アニメーション（マスク、フェード、パララックス）などを含む。

## 使用ライブラリ

- GSAP (GreenSock Animation Platform)
- ScrollTrigger プラグイン
- jQuery（スムーススクロール用）

---

## 1. ScrollTrigger グローバル設定

```javascript
"use strict";

//-----------------------------------------------
// ScrollTrigger グローバル設定
//-----------------------------------------------
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Safariやモバイル対応の設定
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  ScrollTrigger.normalizeScroll(true);

  // 画像読み込みなど完了後に再計算
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
```

---

## 2. スムーススクロール（アンカーリンク、ページトップ対応）

```javascript
// -------------------------------------------------------
// スムーススクロール｜アンカーリンク、ページトップ対応
// -------------------------------------------------------
$(document).ready(function () {
  const time = 800; // スクロール時間を緩やかに（400ms → 800ms）
  const headerHeight = $(".header").outerHeight() || 0;

  // カスタムイージング関数（より滑らかな動き）
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };

  $(document).on("click", 'a[href*="#"]', function (event) {
    const linkUrl = this.href.split("#")[0]; // クリックされたリンクのベースのURL
    const currentUrl = location.href.split("#")[0]; // 現在のページのベースのURL

    if (linkUrl === currentUrl) {
      const hash = this.hash; // #about など各セクションに付与したidの#
      const target = $(hash.length ? hash : "html");

      if (target.length) {
        const targetY = target.offset().top - headerHeight;
        $("html, body").animate({ scrollTop: targetY }, time, "easeInOutCubic");
        event.preventDefault();
      }
    }
  });

  // ページ読み込み時にアンカー付きURLだったら自動スクロール
  const hash = location.hash;
  if (hash) {
    const target = $(hash);
    if (target.length) {
      const targetY = target.offset().top - headerHeight;
      $("html, body").scrollTop(targetY);
    }
  }
});
```

---

## 3. メニュー制御（iOS 対応の背景固定）

```javascript
//-----------------------------------------------
// メニュー押下時に背景を固定する
//-----------------------------------------------
let scrollPosition; // スクロール位置を保存する変数

// iOS（iPadOSを含む）かどうかのUA判定
const ua = window.navigator.userAgent.toLowerCase();
const isiOS =
  ua.indexOf("iphone") > -1 ||
  ua.indexOf("ipad") > -1 ||
  (ua.indexOf("macintosh") > -1 && "ontouchend" in document);

// bodyのスクロール固定
function bodyFixedOn() {
  const body = document.body;

  if (isiOS) {
    // iOSの場合
    scrollPosition = window.pageYOffset; // 現在のスクロール位置を保存
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.top = `-${scrollPosition}px`;
  } else {
    // それ以外
    body.style.overflow = "hidden";
  }
}

// bodyのスクロール固定を解除
function bodyFixedOff() {
  const body = document.body;

  if (isiOS) {
    // iOSの場合
    body.style.position = "";
    body.style.width = "";
    body.style.top = "";
    window.scrollTo(0, scrollPosition); // 保存した位置までスクロール
  } else {
    // それ以外
    body.style.overflow = "";
  }
}

//-----------------------------------------------
// ドロワーメニュー
//-----------------------------------------------
const hamburger = document.querySelector(".js-hamburger");
const spNav = document.querySelector(".js-sp-nav");
const navLinks = document.querySelectorAll(".js-sp-nav a[href]");

// フェードインの関数
function fadeIn(element, duration = 300) {
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transition = `opacity ${duration}ms`;

  setTimeout(() => {
    element.style.opacity = 1;
  }, 0);
}

// フェードアウトの関数
function fadeOut(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.display = "none";
  }, duration);
}

// SP用ドロワーメニュー制御
function handleSpMenu() {
  if (window.innerWidth <= 768) {
    // SP時のみハンバーガークリックイベント有効
    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  } else {
    // PC時はメニュー非表示かつイベント解除
    hamburger.classList.remove("is-active");
    fadeOut(spNav, 300);
    bodyFixedOff();

    hamburger.removeEventListener("click", toggleMenu);
    navLinks.forEach((link) => {
      link.removeEventListener("click", closeMenu);
    });
  }
}

// ハンバーガーメニューの開閉処理
function toggleMenu() {
  if (hamburger.classList.contains("is-active")) {
    hamburger.classList.remove("is-active");
    fadeOut(spNav, 300);
    bodyFixedOff();
  } else {
    hamburger.classList.add("is-active");
    fadeIn(spNav, 300);
    bodyFixedOn();
  }
}

// メニューを閉じる処理
function closeMenu() {
  hamburger.classList.remove("is-active");
  fadeOut(spNav, 300);
  bodyFixedOff();
}

// 初回ロード時に制御実行
handleSpMenu();

// 画面リサイズ時に制御
window.addEventListener("resize", handleSpMenu);
```

---

## 4. ヘッダー連動（スクロール時の背景色変更）

```javascript
//-----------------------------------------------
// 下にスクロールさせたらヘッダーに背景色とフォントカラーを付与する (TOPページ)
//-----------------------------------------------
const header = document.querySelector(".header");
const headerInner = document.querySelector(".header__inner");
const mv = document.querySelector(".mv");

// スクロール時の処理関数
function handleScroll() {
  if (window.scrollY > 0) {
    // 少しでもスクロールした場合、クラスを追加する
    header?.classList.add("headerChange");
    headerInner?.classList.add("headerChange");
  } else {
    // トップに戻った時、クラスを外す
    header?.classList.remove("headerChange");
    headerInner?.classList.remove("headerChange");
  }
}

// ロード時とスクロール時に処理を実行
window.addEventListener("load", handleScroll);
window.addEventListener("scroll", handleScroll);
```

---

## 5. サービスリスト カテゴリラベルアニメーション

```javascript
//-----------------------------------------------
// サービスリスト カテゴリラベルアニメーション
//-----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const serviceList = document.querySelector(".js-service-list");
  if (!serviceList) return;

  const categoryCreate = document.querySelector(".js-category-create");
  const categorySupport = document.querySelector(".js-category-support");
  const serviceItems = document.querySelectorAll(".js-service-item");

  if (!categoryCreate || !categorySupport || serviceItems.length === 0) return;

  // PC時のみ実行
  if (window.innerWidth <= 768) return;

  // 初期状態の設定
  categoryCreate.classList.remove("is-active");
  categorySupport.classList.remove("is-active");

  // 各カテゴリの開始位置を取得
  let buildEndItem = null;
  let createStartItem = null;
  let createEndItem = null;
  let supportStartItem = null;
  let supportEndItem = null;

  serviceItems.forEach((item, index) => {
    const category = item.getAttribute("data-category");
    if (category === "build" && index === 5) {
      // エクステリア（6番目、index 5）
      buildEndItem = item;
    } else if (category === "create" && index === 6) {
      // 大工（7番目、index 6）
      createStartItem = item;
    } else if (category === "create" && index === 8) {
      // 軽天（9番目、index 8）
      createEndItem = item;
    } else if (category === "support" && index === 9) {
      // 住宅設備（10番目、index 9）
      supportStartItem = item;
    } else if (category === "support" && index === 11) {
      // 太陽光（12番目、index 11）
      supportEndItem = item;
    }
  });

  if (
    !buildEndItem ||
    !createStartItem ||
    !createEndItem ||
    !supportStartItem ||
    !supportEndItem
  )
    return;

  // GSAP ScrollTriggerを登録
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // 「築く」から「築く×造る」への切り替え
    ScrollTrigger.create({
      trigger: createStartItem,
      start: "top 60%",
      onEnter: () => {
        gsap.to(categoryCreate, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            categoryCreate.classList.add("is-active");
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(categoryCreate, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            categoryCreate.classList.remove("is-active");
          },
        });
      },
    });

    // 「築く×造る」から「築く×造る×支える」への切り替え
    ScrollTrigger.create({
      trigger: supportStartItem,
      start: "top 80%",
      onEnter: () => {
        gsap.to(categorySupport, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            categorySupport.classList.add("is-active");
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(categorySupport, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            categorySupport.classList.remove("is-active");
          },
        });
      },
    });
  }
});
```

---

## 6. ピン留めアニメーション（ABOUT ページ）

```javascript
//-----------------------------------------------
// ピン留めアニメーション（ABOUTページ）
//-----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const aboutSkill = document.querySelector(".js-about-skill");
  if (!aboutSkill) return;

  gsap.registerPlugin(ScrollTrigger);

  // アニメーションで使用する各要素を取得
  const getElements = () => ({
    title1: aboutSkill.querySelector(".js-about-skill-title-1"),
    title2: aboutSkill.querySelector(".js-about-skill-title-2"),
    text: aboutSkill.querySelector(".js-about-skill-text"),
    bgInner: aboutSkill.querySelector(".js-about-skill-bg"),
  });

  // 現在のアニメーションタイムラインを保持
  let aboutSkillTimeline = null;

  // 既存のタイムラインとScrollTriggerを完全に削除
  const destroyTimeline = () => {
    if (aboutSkillTimeline) {
      aboutSkillTimeline.scrollTrigger?.kill();
      aboutSkillTimeline.kill();
      aboutSkillTimeline = null;
    }
  };

  // アニメーションの初期状態を設定（縁取り文字のみ表示）
  const resetInitialState = (elements) => {
    const { title1, title2, text, bgInner } = elements;
    gsap.set(title1, { opacity: 1 });
    gsap.set(title2, { opacity: 0 });
    gsap.set(text, { opacity: 0 });
    if (bgInner) {
      gsap.set(bgInner, { "--_backdrop-filter": "blur(0px)" });
    }
  };

  // スクロール連動アニメーションのタイムラインを作成
  const createTimeline = (elements) => {
    const { title1, title2, text, bgInner } = elements;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSkill,
        start: "top top",
        end: "+=300%",
        scrub: 1, // スクロールに1秒かけて滑らかに同期
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 段階1: 縁取り→塗りつぶしへクロスフェード
    tl.to(title1, { opacity: 0, duration: 1, ease: "power2.inOut" }, 0).to(
      title2,
      { opacity: 1, duration: 1, ease: "power2.inOut" },
      0
    );

    // 段階2: 塗りつぶしが薄くなり、テキスト表示
    tl.to(title2, { opacity: 0.15, duration: 1, ease: "power2.inOut" }, 1).to(
      text,
      { opacity: 1, duration: 1, ease: "power2.inOut" },
      1
    );

    // ぼかしエフェクト（段階1と同時）
    if (bgInner) {
      tl.to(
        bgInner,
        {
          "--_backdrop-filter": "blur(5px)",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
    }

    return tl;
  };

  // アニメーションを初期化（restoreProgress: trueで進行度を保持）
  const initAboutSkillAnimation = ({ restoreProgress = false } = {}) => {
    const previousProgress =
      restoreProgress && aboutSkillTimeline?.scrollTrigger
        ? aboutSkillTimeline.scrollTrigger.progress
        : null;

    const elements = getElements();
    if (!elements.title1 || !elements.title2 || !elements.text) return;

    destroyTimeline();
    resetInitialState(elements);
    aboutSkillTimeline = createTimeline(elements);

    if (previousProgress !== null) {
      aboutSkillTimeline.progress(previousProgress);
    }
  };

  // ScrollTriggerの位置を再計算（アニメーションは保持）
  const refreshAnimation = () => {
    ScrollTrigger.refresh();
  };

  // 遅延読み込み画像が読み込まれたタイミングで位置を再計算
  const setupLazyImageHandlers = () => {
    const lazyImages = aboutSkill.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length === 0) return;

    let loadedLazyImages = 0;

    const handleImageLoad = () => {
      loadedLazyImages++;
      // 3枚ごとに再計算（パフォーマンス考慮）
      if (loadedLazyImages % 3 === 0) {
        ScrollTrigger.refresh();
      }
      // 全部読み込み完了
      if (loadedLazyImages === lazyImages.length) {
        setTimeout(refreshAnimation, 100);
      }
    };

    lazyImages.forEach((img) => {
      if (img.complete) {
        loadedLazyImages++;
      } else {
        img.addEventListener("load", handleImageLoad, { once: true });
        img.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    // 既に全部読み込まれてる場合
    if (loadedLazyImages === lazyImages.length) {
      setTimeout(refreshAnimation, 100);
    }
  };

  // ページの70%以上スクロールしたら一度だけ再計算
  const setupScrollHandler = () => {
    let hasRefreshedBottom = false;

    window.addEventListener(
      "scroll",
      () => {
        const scrollPercentage =
          (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrollPercentage > 0.7 && !hasRefreshedBottom) {
          hasRefreshedBottom = true;
          refreshAnimation();
        }
      },
      { passive: true }
    );
  };

  // 画面幅変更時に進行度を保持したまま再初期化
  const setupResizeHandler = () => {
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAboutSkillAnimation({ restoreProgress: true });
        ScrollTrigger.refresh(true);
      }, 200);
    });
  };

  // 初期化実行
  initAboutSkillAnimation();
  setupLazyImageHandlers();
  setupScrollHandler();
  setupResizeHandler();
});
```

---

## 7. マウスストーカー（PC 1100px 以上）

```javascript
//-----------------------------------------------
// マウスストーカー（PC 1100px 以上）
//-----------------------------------------------
const stalker = document.querySelector(".js-mouse-stalker");

if (!stalker) {
  console.warn("マウスストーカーがないページです。処理を停止します。");
} else {
  const stalkerText = stalker.querySelector(".btn-stalker__text");
  const hoverSections = document.querySelectorAll(".js-hover-section");

  // mousemove 用
  let mouseX = 0;
  let mouseY = 0;

  // scroll用に保存する位置
  let lastMouseX = null;
  let lastMouseY = null;

  // GSAP の GPU 高速 transform setter
  const setX = gsap.quickSetter(stalker, "x", "px");
  const setY = gsap.quickSetter(stalker, "y", "px");

  // transform 対応の当たり判定
  function isInsideViewport(mouse, element) {
    const rect = element.getBoundingClientRect();
    return (
      mouse.x >= rect.left &&
      mouse.x <= rect.right &&
      mouse.y >= rect.top &&
      mouse.y <= rect.bottom
    );
  }

  // active セクション更新（CSSクラス付け替え）
  function updateActive(mouse) {
    let activeSection = null;

    hoverSections.forEach((section) => {
      if (isInsideViewport(mouse, section)) {
        activeSection = section;
      }
    });

    // active セクションあり
    if (activeSection) {
      const link = activeSection.dataset.link || "#";
      const label = activeSection.dataset.label || "";
      const type = activeSection.dataset.type || "";

      stalker.href = link;
      stalkerText.textContent = label;

      stalker.classList.add("btn-stalker--active");
      stalker.classList.add(`btn-stalker--${type}`);
    } else {
      stalker.classList.remove("btn-stalker--active");
      stalker.classList.remove("btn-stalker--about");
      stalker.classList.remove("btn-stalker--company");
    }
  }

  // mousemove → 60fps で GPU 追従（絶対止まらない）
  document.addEventListener("mousemove", (e) => {
    // PC以外では動かさない
    if (window.innerWidth < 1100) return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    // GPU transform で超滑らか追従
    setX(mouseX);
    setY(mouseY);

    updateActive({ x: mouseX, y: mouseY });
  });

  // scroll → マウス位置そのままで active 判定だけ更新
  window.addEventListener("scroll", () => {
    if (window.innerWidth < 1100) return;
    if (lastMouseX == null) return;

    updateActive({ x: lastMouseX, y: lastMouseY });
  });

  // resize → SPに戻ったら強制OFF
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1100) {
      stalker.classList.remove("btn-stalker--active");
    }
  });
}
```

---

## 8. 横スクロール関連（PC/SP 対応）

### PC 版（768px 以上）

```javascript
// ===============================================================
// 横スクロール関連
//  - 768px以上：横スクロール＋横アニメ（containerAnimation）
//  - 767px以下：横スクロールなし、横アニメだけ縦スクロールで発火
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.matchMedia({
    // PC・タブレット（768px以上）
    '(min-width: 768px)': function () {
      const wrappers = document.querySelectorAll('.horizontal-wrapper');

      wrappers.forEach((wrapper) => {
        const pages = wrapper.querySelectorAll('.horizontal-item').length;
        const moveX = -100 + 100 / pages;

        // 横スクロール本体
        const horizontalTween = gsap.to(wrapper, {
          xPercent: moveX,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: `+=${pages * 100}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            id: 'horizontal-scroll',
          },
        });

        // 横マスク .js-mask--h（横スクロール連動）
        const horizontalMasks = wrapper.querySelectorAll('.js-mask--h');
        horizontalMasks.forEach((mask) => {
          ScrollTrigger.create({
            trigger: mask,
            containerAnimation: horizontalTween,
            horizontal: true,
            start: 'left center',
            toggleClass: { targets: mask, className: 'is-open' },
            once: true,
            id: 'horizontal-mask',
          });
        });

        // 横フェード .js-fade-op--h（横スクロール連動）
        const horizontalFades = wrapper.querySelectorAll('.js-fade-op--h');
        horizontalFades.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0 },
            {
              opacity: 1,
              ease: 'power2.out',
              duration: 1.0,
              scrollTrigger: {
                trigger: item,
                containerAnimation: horizontalTween,
                horizontal: true,
                start: 'left center',
                id: 'horizontal-fade',
              },
            },
          );
        });

        // 横フェードイン - 右から（連続）
        const horizontalFadeTriggers = wrapper.querySelectorAll('.js-fadeIn-rights-trigger--h');
        horizontalFadeTriggers.forEach((trigger) => {
          const items = trigger.querySelectorAll('.js-fadeIn-rights--h');
          items.forEach((item, index) => {
            gsap.fromTo(
              item,
              { autoAlpha: 0, x: 100 },
              {
                autoAlpha: 1,
                x: 0,
                ease: 'power2.out',
                duration: 0.5,
                delay: 0.2 * index,
                scrollTrigger: {
                  trigger: trigger,
                  containerAnimation: horizontalTween,
                  horizontal: true,
                  start: 'left center',
                  id: 'horizontal-fade-rights',
                },
              },
            );
          });
        });

        // 横パララックス 01：.js-parallax--h（img を動かす）
        const parallaxBlocks = wrapper.querySelectorAll('.js-parallax--h');
        parallaxBlocks.forEach((block) => {
          const img = block.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: 0 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                containerAnimation: horizontalTween,
                horizontal: true,
                start: 'left bottom',
                end: 'right top',
                scrub: 1,
                id: 'horizontal-parallax-01',
              },
            },
          );
        });

        // 横パララックス 02：.js-parallax--h-02（要素自体を動かす）
        const parallaxBlocks02 = wrapper.querySelectorAll('.js-parallax--h-02');
        parallaxBlocks02.forEach((block) => {
          gsap.fromTo(
            block,
            { xPercent: 0 },
            {
              xPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                containerAnimation: horizontalTween,
                horizontal: true,
                start: 'left bottom',
                end: 'right top',
                scrub: 1,
                id: 'horizontal-parallax-02',
              },
            },
          );
        });
      });
    },
```

### SP 版（767px 以下）

```javascript
    // SP（767px以下）
    '(max-width: 767px)': function () {
      const wrappers = document.querySelectorAll('.horizontal-wrapper');

      wrappers.forEach((wrapper) => {
        // マスク .js-mask--h（縦スクロール版）
        const masksSp = wrapper.querySelectorAll('.js-mask--h');
        masksSp.forEach((mask) => {
          ScrollTrigger.create({
            trigger: mask,
            start: 'top bottom-=100',
            once: true,
            toggleClass: { targets: mask, className: 'is-open' },
            id: 'horizontal-mask-sp',
          });
        });

        // フェード .js-fade-op--h（縦スクロール版）
        const fadesSp = wrapper.querySelectorAll('.js-fade-op--h');
        fadesSp.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0 },
            {
              opacity: 1,
              ease: 'power2.out',
              duration: 1.0,
              scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                id: 'horizontal-fade-sp',
              },
            },
          );
        });

        // フェード右（連続）SP版
        const fadeTriggersSp = wrapper.querySelectorAll('.js-fadeIn-rights-trigger--h');
        fadeTriggersSp.forEach((trigger) => {
          const items = trigger.querySelectorAll('.js-fadeIn-rights--h');
          items.forEach((item, index) => {
            gsap.fromTo(
              item,
              { autoAlpha: 0, x: 100 },
              {
                autoAlpha: 1,
                x: 0,
                ease: 'power2.out',
                duration: 0.5,
                delay: 0.2 * index,
                scrollTrigger: {
                  trigger: trigger,
                  start: 'top bottom-=100',
                  id: 'horizontal-fade-rights-sp',
                },
              },
            );
          });
        });

        // パララックス 01（img）SP版
        const parallaxBlocksSp = wrapper.querySelectorAll('.js-parallax--h');
        parallaxBlocksSp.forEach((block) => {
          const img = block.querySelector('img');
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: 0 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                id: 'horizontal-parallax-01-sp',
              },
            },
          );
        });
      });
    },
  });
});
```

---

## 9. 縦スクロールアニメーション各種

### マスクアニメーション（X 軸方向）

```javascript
//-----------------------------------------------
// マスクアニメーション（X軸方向）.js-mask
//-----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const masks = document.querySelectorAll(".js-mask");

  masks.forEach((mask) => {
    gsap.fromTo(
      mask,
      {},
      {
        scrollTrigger: {
          trigger: mask,
          start: "top bottom-=100",
          once: true,
          toggleClass: { targets: mask, className: "is-open" },
          id: "vertical-mask",
        },
      }
    );
  });
});
```

### フェードイン - 透過

```javascript
//-----------------------------------------------
// フェードイン - 透過 .js-fade-op
//-----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll(".js-fade-op");

  fadeItems.forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        duration: 1.0,
        delay: 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          id: "vertical-fade",
        },
      }
    );
  });
});
```

### フェードイン - 右から（単発・連続）

```javascript
// フェードイン - 右から（単発）
let fadeRight01 = document.querySelectorAll(".js-fadeIn-right");
fadeRight01.forEach(function (fadeRight01) {
  gsap.fromTo(
    fadeRight01,
    { autoAlpha: 0, x: 100 },
    {
      autoAlpha: 1,
      x: 0,
      ease: "power2.out",
      duration: 0.3,
      delay: 0.1,
      scrollTrigger: {
        trigger: fadeRight01,
        start: "top bottom-=100",
      },
    }
  );
});

// フェードイン - 右から（連続）
document.addEventListener("DOMContentLoaded", () => {
  const fadeTriggers = document.querySelectorAll(".js-fadeIn-rights-trigger");

  fadeTriggers.forEach((trigger) => {
    const fadeItems = trigger.querySelectorAll(".js-fadeIn-rights");

    fadeItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, x: 100 },
        {
          autoAlpha: 1,
          x: 0,
          ease: "power2.out",
          duration: 0.5,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom-=100",
            id: "vertical-fade-rights",
          },
        }
      );
    });
  });
});
```

### フェードイン - 奥からポップアップ（連続）

```javascript
//-----------------------------------------------
// フェードイン - 奥からポップアップ（連続）
//-----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const popupTriggers = document.querySelectorAll(".js-fadeIn-popup-trigger");

  popupTriggers.forEach((trigger) => {
    const popupItems = trigger.querySelectorAll(".js-fadeIn-popup");

    popupItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          scale: 0.7,
          transformPerspective: 2000,
          z: -100,
        },
        {
          autoAlpha: 1,
          scale: 1,
          z: 0,
          ease: "back.out(1.7)",
          duration: 0.5,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom-=100",
            id: "popup-fade-depth",
          },
        }
      );
    });
  });
});
```

### フェードイン - 下から（単発・連続）

```javascript
// フェードイン - 下から（連続）
let fadeInUpTriggers = document.querySelectorAll(".js-fadeIn-ups-trigger");
fadeInUpTriggers.forEach((trigger) => {
  let fadeInUps = trigger.querySelectorAll(".js-fadeIn-ups");

  fadeInUps.forEach((fadeInUp, index) => {
    gsap.fromTo(
      fadeInUp,
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.5,
        delay: 0.2 * index,
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom-=100",
        },
      }
    );
  });
});

// フェードイン - 下から（単発）
let fadeinups = document.querySelectorAll(".js-fadeIn-up-single");
fadeinups.forEach(function (fadeInUp) {
  gsap.fromTo(
    fadeInUp,
    { autoAlpha: 0, y: 100 },
    {
      autoAlpha: 1,
      y: 0,
      ease: "power4.out",
      duration: 1,
      delay: 0.1,
      scrollTrigger: {
        trigger: fadeInUp,
        start: "top bottom-=100",
      },
    }
  );
});
```

### パララックス（縦・横方向）

```javascript
// パララックス｜画像（縦スクロール用）.js-parallax
document.addEventListener("DOMContentLoaded", () => {
  const jsParallaxes = document.querySelectorAll(".js-parallax");

  jsParallaxes.forEach((jsParallax) => {
    const img = jsParallax.querySelector("img");
    if (!img) return;

    gsap.fromTo(
      img,
      { yPercent: 0 },
      {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: jsParallax,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          id: "vertical-parallax",
        },
      }
    );
  });
});

// パララックス｜横方向（X軸スクロール）
document.addEventListener("DOMContentLoaded", () => {
  const jsParallaxXElements = document.querySelectorAll(".js-parallax--x");

  jsParallaxXElements.forEach((parallaxXEl) => {
    gsap.fromTo(
      parallaxXEl,
      { xPercent: 0 },
      {
        xPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxXEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          id: "horizontal-parallax",
        },
      }
    );
  });
});
```

---

## 技術的な特徴

- **レスポンシブ対応**: PC/SP で異なる挙動
- **iOS 対応**: スクロール固定処理
- **GPU 高速化**: quickSetter 使用
- **遅延読み込み画像対応**: 画像読み込み完了後に再計算
- **画面リサイズ対応**: 進行度を保持したまま再初期化
- **パフォーマンス最適化**: 3 枚ごとの再計算など

## 次アクション

- [ ] このコードを適切なプロジェクトフォルダに移動
- [ ] 使用しているライブラリのバージョンを確認
- [ ] コードの再利用性を検討
- [ ] 必要に応じて 04_Memory/Technical/に技術ノートとして保存

#inbox #javascript #gsap #animation #web-development
