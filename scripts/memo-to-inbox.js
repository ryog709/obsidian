#!/usr/bin/env node

/**
 * Memo→Inbox変換スクリプト
 *
 * 00_Memoの雑なメモを全て01_Inboxの形式に整形して変換します（承認不要で自動実行）
 *
 * 使用方法:
 *   node scripts/memo-to-inbox.js [ファイル名]
 *
 * 例:
 *   node scripts/memo-to-inbox.js                    # 00_Memo内の全ファイルを処理
 *   node scripts/memo-to-inbox.js 雑メモ.md         # 特定のファイルを処理
 */

const fs = require("fs");
const path = require("path");

// 設定
const CONFIG = {
  memoDir: path.join(__dirname, "../00_Memo"),
  inboxDir: path.join(__dirname, "../01_Inbox"),
  archiveDir: path.join(__dirname, "../99_Archive"),
};

// 今日の日付をYYYYMMDD形式で取得
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// ファイルを再帰的に検索
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith(".md")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// ファイル内容を読み込む
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`❌ ファイル読み込みエラー: ${filePath}`, error.message);
    return null;
  }
}

// メタデータを削除
function removeMetadata(content) {
  // YAML frontmatterを削除
  content = content.replace(/^---\n[\s\S]*?\n---\n/gm, "");

  // TODOセクションを削除
  content = content.replace(
    /##\s*💡\s*学んだ概念・パターン[\s\S]*?(?=\n##|\n#|$)/g,
    ""
  );
  content = content.replace(/##\s*🔗\s*関連ノート[\s\S]*?(?=\n##|\n#|$)/g, "");

  // セッションID、時刻などのメタ情報を削除
  content = content.replace(/セッションID:\s*\S+/g, "");
  content = content.replace(/時刻:\s*\S+/g, "");

  return content.trim();
}

// タイトルを生成
function generateTitle(content, originalFileName) {
  // 内容から最初の見出しを抽出
  const headingMatch = content.match(/^#+\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  // ファイル名から推測
  const fileNameWithoutExt = path.basename(originalFileName, ".md");
  if (fileNameWithoutExt && fileNameWithoutExt !== "memo") {
    return fileNameWithoutExt;
  }

  // デフォルト
  return "メモ";
}

// 概要を生成
function generateSummary(content) {
  // 最初の段落を抽出
  const firstParagraph = content.split("\n\n")[0];
  if (firstParagraph && firstParagraph.length > 10) {
    return (
      firstParagraph.substring(0, 100) +
      (firstParagraph.length > 100 ? "..." : "")
    );
  }
  return "メモ内容";
}

// Inbox形式に変換
function convertToInboxFormat(content, originalFileName) {
  const title = generateTitle(content, originalFileName);
  const summary = generateSummary(content);
  const cleanedContent = removeMetadata(content);

  return `# ${title}

## 概要
${summary}

## 内容
${cleanedContent}

## 次アクション
- [ ] 関連ノートにリンク
- [ ] 必要に応じてMemory Noteに変換

#inbox
`;
}

// ファイル名を生成
function generateInboxFileName(title) {
  const date = getTodayDate();
  // ファイル名に使えない文字を置換
  const safeTitle = title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .substring(0, 50); // 長すぎる場合は切り詰め

  return `${date}_${safeTitle}.md`;
}

// ファイルをInboxに作成
function createInboxFile(content, fileName) {
  const inboxPath = path.join(CONFIG.inboxDir, fileName);

  // 同名ファイルが存在する場合は番号を付ける
  let finalPath = inboxPath;
  let counter = 1;
  while (fs.existsSync(finalPath)) {
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    finalPath = path.join(CONFIG.inboxDir, `${baseName}_${counter}${ext}`);
    counter++;
  }

  fs.writeFileSync(finalPath, content, "utf-8");
  return finalPath;
}

// ファイルをアーカイブに移動
function archiveFile(filePath) {
  const fileName = path.basename(filePath);
  const archivePath = path.join(CONFIG.archiveDir, "2025", fileName);

  // アーカイブディレクトリが存在しない場合は作成
  const archiveDir = path.dirname(archivePath);
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  // 同名ファイルが存在する場合は番号を付ける
  let finalArchivePath = archivePath;
  let counter = 1;
  while (fs.existsSync(finalArchivePath)) {
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    finalArchivePath = path.join(archiveDir, `${baseName}_${counter}${ext}`);
    counter++;
  }

  fs.renameSync(filePath, finalArchivePath);
  return finalArchivePath;
}

// 空のフォルダを削除
function removeEmptyFolders(dir) {
  let removedCount = 0;

  function checkAndRemove(currentDir) {
    if (!fs.existsSync(currentDir)) {
      return;
    }

    const files = fs.readdirSync(currentDir);

    // サブディレクトリを再帰的にチェック
    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        checkAndRemove(filePath);
      }
    });

    // 空のディレクトリを削除（memoディレクトリ自体は残す）
    const remainingFiles = fs.readdirSync(currentDir);
    if (remainingFiles.length === 0 && currentDir !== CONFIG.memoDir) {
      fs.rmdirSync(currentDir);
      removedCount++;
    }
  }

  checkAndRemove(dir);
  return removedCount;
}

// メイン処理
function main() {
  const targetFile = process.argv[2];

  console.log("🚀 Memo→Inbox変換を開始します...\n");

  // 対象ファイルを取得
  let targetFiles = [];

  if (targetFile) {
    // 特定のファイルを処理
    const filePath = path.isAbsolute(targetFile)
      ? targetFile
      : path.join(CONFIG.memoDir, targetFile);

    if (fs.existsSync(filePath)) {
      targetFiles = [filePath];
    } else {
      console.error(`❌ ファイルが見つかりません: ${filePath}`);
      process.exit(1);
    }
  } else {
    // 全ファイルを処理
    targetFiles = findMarkdownFiles(CONFIG.memoDir);
  }

  if (targetFiles.length === 0) {
    console.log("ℹ️  処理対象のファイルがありません。");
    return;
  }

  console.log(`📋 処理対象ファイル: ${targetFiles.length}件\n`);

  // 各ファイルを処理
  const results = {
    converted: [],
    errors: [],
  };

  targetFiles.forEach((filePath) => {
    try {
      console.log(`📖 読み込み中: ${path.basename(filePath)}`);

      // ファイル内容を読み込む
      const content = readFileContent(filePath);
      if (!content) {
        results.errors.push({ file: filePath, error: "ファイル読み込み失敗" });
        return;
      }

      // Inbox形式に変換
      const inboxContent = convertToInboxFormat(content, filePath);
      const inboxFileName = generateInboxFileName(
        generateTitle(content, filePath)
      );

      // Inboxに作成
      const inboxPath = createInboxFile(inboxContent, inboxFileName);
      console.log(`✅ 作成: ${path.relative(CONFIG.inboxDir, inboxPath)}`);

      // アーカイブに移動
      const archivePath = archiveFile(filePath);
      console.log(
        `📦 アーカイブ: ${path.relative(CONFIG.archiveDir, archivePath)}\n`
      );

      results.converted.push({
        original: filePath,
        inbox: inboxPath,
        archive: archivePath,
      });
    } catch (error) {
      console.error(`❌ エラー: ${filePath}`, error.message);
      results.errors.push({ file: filePath, error: error.message });
    }
  });

  // 空のフォルダを削除
  console.log("🧹 空のフォルダを削除中...");
  const removedFolders = removeEmptyFolders(CONFIG.memoDir);
  console.log(`✅ 削除したフォルダ: ${removedFolders}個\n`);

  // 結果を報告
  console.log("=".repeat(50));
  console.log("📊 処理結果");
  console.log("=".repeat(50));
  console.log(`✅ 変換成功: ${results.converted.length}件`);
  console.log(`❌ エラー: ${results.errors.length}件`);
  console.log(`🗑️  削除したフォルダ: ${removedFolders}個`);

  if (results.errors.length > 0) {
    console.log("\n❌ エラー詳細:");
    results.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  console.log("\n✨ 処理完了！");
}

// 実行
if (require.main === module) {
  main();
}

module.exports = { main };
