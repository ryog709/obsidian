# マウスストーカーボタン-HTML

## 概要

マウスカーソルに追従するストーカーボタンの HTML 実装。PC 表示のみで動作し、SP では非表示。

## HTML コード

```html
<!-- マウスストーカーボタン（全セクション共通） -->
<a href="#" class="btn-stalker js-mouse-stalker">
  <span class="btn-stalker__text"></span>
</a>
```

## 特徴

- シンプルな構造（`<a>`タグと`<span>`のみ）
- JavaScript 連携（`js-mouse-stalker`クラス）
- テキストは JavaScript で動的に挿入される想定

## 使用例

- ページトップへ戻るボタン
- 次のセクションへスクロールするボタン
- マウスカーソルに追従する UI 要素

## 関連

- [[マウスストーカーボタン-CSS実装]]

#html #css #mouse-stalker #interaction #bem
