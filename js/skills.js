// skills.js — スキル定義データ（Git で公開する静的ファイル）
// 進捗データは localStorage に保存し、このファイルは変更しない

const SKILLS = [
  // ─────────────────────────────────────────
  // GROUP A: 初期セットアップ
  // ─────────────────────────────────────────
  {
    id: 'install', name: 'インストール', group: 'A', icon: '⚙️',
    x: 120, y: 190, requires: [],
    achievement: 'ターミナルで claude --version が表示される',
    howto: '1. Node.js 18以上をインストール\n2. npm install -g @anthropic-ai/claude-code\n3. claude --version で確認',
    verification: 'ターミナルで claude --version を実行しバージョンが表示される',
    defaultNotes: ''
  },
  {
    id: 'basic_ops', name: '基本操作', group: 'A', icon: '💻',
    x: 120, y: 360, requires: ['install'],
    achievement: 'ファイル読み取り・編集・コマンド実行ができる',
    howto: '1. プロジェクトフォルダで claude と入力して起動\n2. 「このファイルを読んで」と依頼\n3. 「〇〇を修正して」と依頼\n4. /help でコマンド一覧確認',
    verification: '実際のファイルを「要約して」と依頼し正しく回答される',
    defaultNotes: ''
  },
  {
    id: 'safe_use', name: '安全な使い方', group: 'A', icon: '🛡️',
    x: 120, y: 530, requires: ['basic_ops'],
    achievement: '危険な操作を防ぐ設定ができている',
    howto: '1. /allowed-tools で許可ツールを確認\n2. 重要なファイルは事前にバックアップ\n3. 「削除前に確認して」と明示的に指示\n4. .gitignore で機密ファイルを除外',
    verification: '「このファイルを削除して」と言ったとき確認を求めてくれる',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP B: 文脈理解
  // ─────────────────────────────────────────
  {
    id: 'proj_understanding', name: 'プロジェクト理解', group: 'B', icon: '📁',
    x: 320, y: 190, requires: ['basic_ops'],
    achievement: 'プロジェクトの構成をClaudeに正確に把握させられる',
    howto: '1. プロジェクトルートで claude を起動\n2. 「このプロジェクトの構成を説明して」と依頼\n3. CLAUDE.md にプロジェクト概要を書く\n4. 「重要なファイルはどれ？」と確認',
    verification: 'Claudeがファイル構成・役割を正確に説明できること',
    defaultNotes: ''
  },
  {
    id: 'spec_org', name: '仕様整理', group: 'B', icon: '📋',
    x: 320, y: 360, requires: ['proj_understanding'],
    achievement: 'Claudeと仕様をすり合わせ実装方針を決められる',
    howto: '1. 「〇〇を作りたい。仕様を提案して」と依頼\n2. 提案を確認・修正してリストアップ\n3. 「この仕様をもとに実装計画を立てて」と続ける\n4. 不明点を対話しながら明確化する',
    verification: '仕様書（Markdown）をClaudeと一緒に作れること',
    defaultNotes: ''
  },
  {
    id: 'change_scope', name: '変更範囲の把握', group: 'B', icon: '🔍',
    x: 320, y: 530, requires: ['spec_org'],
    achievement: '変更前に影響範囲をClaudeに分析させられる',
    howto: '1. 「〇〇を変更したい。影響するファイルは？」と依頼\n2. 変更前にバックアップを作成\n3. 「変更後に確認すべきことは？」と聞く\n4. git diff でClaudeの変更内容を確認',
    verification: '変更前に影響ファイル一覧が出て意図しない変更がない',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP C: 日常タスク
  // ─────────────────────────────────────────
  {
    id: 'task_today', name: '今日のタスク整理', group: 'C', icon: '✅',
    x: 520, y: 145, requires: ['proj_understanding'],
    achievement: '今日やることをClaudeと整理して出力できる',
    howto: '1. 「今日のタスクを整理したい。以下が候補です:...」と入力\n2. 優先順位付けを依頼\n3. Markdown形式で出力→ファイルに保存\n4. 毎朝の習慣にする',
    verification: '優先順位付きTODOリストが5分以内に作れること',
    defaultNotes: ''
  },
  {
    id: 'schedule', name: 'スケジュール管理', group: 'C', icon: '📅',
    x: 520, y: 285, requires: ['task_today'],
    achievement: '週次スケジュールをClaudeと作成・調整できる',
    howto: '1. 「来週の予定を整理したい。以下の予定があります:...」と入力\n2. 「空き時間に勉強時間を入れて」など調整依頼\n3. カレンダー形式またはMarkdownで出力\n4. 予定変更時に「〇〇が変わったので再調整して」と依頼',
    verification: '1週間のスケジュールをMarkdownで出力できること',
    defaultNotes: ''
  },
  {
    id: 'study_viz', name: '勉強時間の可視化', group: 'C', icon: '📊',
    x: 520, y: 425, requires: ['schedule'],
    achievement: '学習ログをCSV化してグラフ表示できる',
    howto: '1. 毎日の学習時間をテキストで記録（日付・内容・時間）\n2. 「このログをCSVに変換して」とClaudeに依頼\n3. 「Excelで見やすいグラフの作り方を教えて」と依頼\n4. または簡単なHTMLグラフをClaudeに作らせる',
    verification: '1週間の学習時間が棒グラフで確認できること',
    defaultNotes: ''
  },
  {
    id: 'folder_org', name: 'フォルダー整理', group: 'C', icon: '📂',
    x: 520, y: 565, requires: ['task_today'],
    achievement: 'ファイル整理の計画をClaudeに立てさせ実行できる',
    howto: '1. 「このフォルダの構造を見て整理方法を提案して」と依頼\n2. 整理ルール（命名規則など）をClaudeと決める\n3. 「重複ファイルを見つけて」などの分析を依頼\n4. 実行前に計画確認→承認→実行の流れを守る',
    verification: '整理前後でファイル数・構造の改善がわかること',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP D: 事務・実務
  // ─────────────────────────────────────────
  {
    id: 'excel', name: 'Excel転記', group: 'D', icon: '📊',
    x: 720, y: 180, requires: ['spec_org'],
    achievement: 'CSVデータをExcel形式に変換・整形できる',
    howto: '1. 元データ（テキスト/CSV）をClaudeに渡す\n2. 「Excelの〇〇シート用に整形して」と依頼\n3. 出力CSVをExcelで開いて確認\n4. 「ヘッダー追加」「列並び替え」などの調整を依頼',
    verification: 'テキストデータ→Excel用CSV変換が5分以内にできること',
    defaultNotes: ''
  },
  {
    id: 'household', name: '家計簿自動記入', group: 'D', icon: '💰',
    x: 720, y: 330, requires: ['excel'],
    achievement: 'レシート内容をClaudeが家計簿フォーマットに変換できる',
    howto: '1. レシートの内容をテキストで貼り付ける\n2. 「日付・品目・金額・カテゴリに分類して」と依頼\n3. 家計簿CSVフォーマットを指定して出力させる\n4. 毎月末に月次集計を依頼する',
    verification: '10件のレシートを3分以内に家計簿CSVに変換できること',
    defaultNotes: ''
  },
  {
    id: 'expense', name: '経費精算', group: 'D', icon: '🧾',
    x: 720, y: 480, requires: ['household'],
    achievement: '経費データを精算書フォーマットに変換できる',
    howto: '1. 経費一覧（日付・内容・金額・目的）を入力\n2. 「経費精算書フォーマットに合わせて整形して」と依頼\n3. 合計金額の自動計算を確認\n4. PDFや印刷用HTMLの作成を依頼',
    verification: '1ヶ月分の経費を精算書形式で出力できること',
    defaultNotes: ''
  },
  {
    id: 'docs', name: '資料作成', group: 'D', icon: '📄',
    x: 870, y: 255, requires: ['folder_org'],
    achievement: '箇条書きメモからMarkdown資料を自動生成できる',
    howto: '1. 伝えたい内容を箇条書きでClaudeに渡す\n2. 「会議資料として整形して」と依頼\n3. 目的・対象読者・トーンを指定する\n4. Markdown→HTML変換や印刷用スタイルも依頼可能',
    verification: 'メモから2ページ相当の資料が10分以内に作れること',
    defaultNotes: ''
  },
  {
    id: 'shift', name: 'シフト表作成', group: 'D', icon: '📆',
    x: 870, y: 405, requires: ['docs'],
    achievement: 'メンバー条件を入力してシフト案をClaudeに生成させられる',
    howto: '1. メンバー・希望休・必要人数などの条件を整理して入力\n2. 「これをもとに1ヶ月シフトを組んで」と依頼\n3. 制約（連続勤務上限など）を追加して再生成させる\n4. Excel/CSV形式で出力させて確認・調整',
    verification: '10人程度のシフトを制約付きで自動生成できること',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP E: 発信・制作
  // ─────────────────────────────────────────
  {
    id: 'blog_idea', name: 'ブログ記事のアイデア出し', group: 'E', icon: '💡',
    x: 1060, y: 145, requires: ['docs'],
    achievement: 'テーマを入力して記事アイデアを10件以上出せる',
    howto: '1. 「〇〇について読者に役立つ記事アイデアを10個出して」と依頼\n2. ターゲット読者・ブログの方向性を添えると精度が上がる\n3. 気に入ったアイデアを選んで「この記事の見出し構成を作って」と続ける',
    verification: '1回の依頼で使えそうなアイデアが5件以上出てくること',
    defaultNotes: ''
  },
  {
    id: 'blog_write', name: 'ブログ執筆', group: 'E', icon: '✍️',
    x: 1060, y: 285, requires: ['blog_idea'],
    achievement: 'アイデアから記事本文（1000字以上）を生成できる',
    howto: '1. 記事テーマ・見出し構成・文体・想定読者をClaudeに伝える\n2. 「〇〇の見出しで記事本文を書いて」と依頼\n3. 「もっと具体例を入れて」「もっと短くして」など調整\n4. 事実確認は必ず自分でする',
    verification: '1000字以上の記事草稿を30分以内に作れること',
    defaultNotes: ''
  },
  {
    id: 'blog_post', name: 'ブログ投稿準備', group: 'E', icon: '📮',
    x: 1060, y: 425, requires: ['blog_write'],
    achievement: 'タイトル・サムネ案・メタ説明をClaudeに生成させられる',
    howto: '1. 「この記事に合うタイトル案を5つ出して」と依頼\n2. 「SEOを意識したメタディスクリプションを書いて」と依頼\n3. 「サムネイルに使えるキャッチコピーを考えて」と依頼\n4. SNS投稿用の要約文も作成させる',
    verification: 'タイトル候補・メタ説明・SNS用文がセットで生成できること',
    defaultNotes: ''
  },
  {
    id: 'x_post', name: 'X投稿', group: 'E', icon: '🐦',
    x: 1060, y: 565, requires: ['blog_post'],
    achievement: '情報・感想をXの文字数に合わせて投稿文に変換できる',
    howto: '1. 伝えたい内容をClaudeに渡す\n2. 「140字以内のXポスト文に変換して。複数案出して」と依頼\n3. 「引用RTや返信向けの短い文も作って」と指示\n4. ハッシュタグの候補も依頼する',
    verification: '同じ内容で文体の違う投稿文を3案以上作れること',
    defaultNotes: ''
  },
  {
    id: 'youtube', name: 'YouTube投稿', group: 'E', icon: '🎬',
    x: 1200, y: 200, requires: ['blog_idea'],
    achievement: 'YouTube動画の構成・タイトル・説明文をClaudeに作らせられる',
    howto: '1. 動画テーマをClaudeに渡す\n2. 「動画の構成（導入・本編・まとめ）を5分尺で作って」と依頼\n3. 「SEOを意識したタイトル案を5つ」と依頼\n4. 「動画説明欄のテキストを書いて」と依頼',
    verification: 'タイトル・構成・説明文がセットで10分以内に作れること',
    defaultNotes: ''
  },
  {
    id: 'video_edit', name: '動画編集', group: 'E', icon: '🎞️',
    x: 1200, y: 350, requires: ['youtube'],
    achievement: 'Claudeに動画編集の手順・台本・字幕テキストを作らせられる',
    howto: '1. 「動画の流れを教えるので字幕テキストを作って」と依頼\n2. 「カット割りの案を教えて」と依頼\n3. BGM選びや効果音のタイミングのアドバイスを求める\n4. 編集ツール（CapCut、Premiere等）の使い方もClaudeに聞く',
    verification: '動画の字幕テキストと編集手順書をClaudeと作れること',
    defaultNotes: ''
  },
  {
    id: 'music', name: '音楽作成', group: 'E', icon: '🎵',
    x: 1200, y: 500, requires: ['video_edit'],
    achievement: 'Claudeに音楽プロンプト・コード進行・歌詞の草案を作らせられる',
    howto: '1. 「〇〇な雰囲気のBGMをSunoやUdioで作るプロンプトを作って」と依頼\n2. 「Aメロ・Bメロ・サビの歌詞の草案を書いて」と依頼\n3. 「このイメージに合うコード進行を提案して」と依頼\n4. 生成AIツールと組み合わせて実際に音楽を作る',
    verification: '音楽生成AIに使えるプロンプトと歌詞草案をClaudeと作れること',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP F: 開発
  // ─────────────────────────────────────────
  {
    id: 'portfolio', name: 'ポートフォリオ作成', group: 'F', icon: '🌐',
    x: 1400, y: 180, requires: ['blog_write'],
    achievement: 'Claude Codeで静的ポートフォリオサイトを作れる',
    howto: '1. 「シンプルなポートフォリオサイトを作って。技術: HTML/CSS/JS」と依頼\n2. 自己紹介・スキル・制作物のセクションを指定\n3. GitHub Pages にアップして公開する\n4. Claudeにデザイン改善を依頼する',
    verification: 'GitHub PagesにアクセスできるURLで公開できること',
    defaultNotes: ''
  },
  {
    id: 'ec_site', name: 'ECサイト作成', group: 'F', icon: '🛒',
    x: 1400, y: 320, requires: ['portfolio'],
    achievement: 'Claude Codeで商品一覧・カートUIを持つECサイトを作れる',
    howto: '1. 「商品一覧・詳細・カートページのあるECサイトを作って」と依頼\n2. デザイン・商品データ形式を指定する\n3. レスポンシブ対応を依頼する\n4. StripeなどのPayment組み込み方法もClaudeに聞く',
    verification: 'カート機能が動作するECサイトのHTMLが生成できること',
    defaultNotes: ''
  },
  {
    id: 'app_dev', name: 'アプリ開発', group: 'F', icon: '📱',
    x: 1400, y: 460, requires: ['ec_site'],
    achievement: 'Claude Codeで実用的なWebアプリを一から作れる',
    howto: '1. アプリの仕様をClaudeとすり合わせる\n2. 「技術スタック: React + Node.js で開発して」と依頼\n3. 機能ごとに分割して実装させる\n4. バグが出たらエラーメッセージをそのままClaudeに渡す',
    verification: '自分が使えるWebアプリを完成させてデプロイできること',
    defaultNotes: ''
  },
  {
    id: 'game_dev', name: 'ゲーム開発', group: 'F', icon: '🎮',
    x: 1400, y: 600, requires: ['app_dev'],
    achievement: 'Claude Codeでブラウザで動くゲームを作れる',
    howto: '1. 「Phaser.jsまたはCanvas APIでシンプルなゲームを作って」と依頼\n2. ゲームルール・操作方法・スコアシステムを仕様として伝える\n3. キャラクターや敵の動きをClaudeに実装させる\n4. 友人に遊んでもらいフィードバックをClaudeに渡して改善',
    verification: 'GitHub Pagesで友人がブラウザからプレイできること',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP G: 連携・自動実行
  // ─────────────────────────────────────────
  {
    id: 'scheduled', name: '予定済み機能', group: 'G', icon: '⏰',
    x: 1590, y: 175, requires: [],
    achievement: 'Claude Codeのscheduled機能を使ったタスクを設定できる',
    howto: '1. Claude Codeのスケジュール機能（/schedule）を確認する\n2. 定期実行したいタスクを設定してみる\n3. 実行ログを確認して正しく動いているか確かめる\n4. 失敗時の通知設定も行う',
    verification: '設定したスケジュールが自動で実行されていること',
    defaultNotes: ''
  },
  {
    id: 'dispatch', name: 'Dispatch', group: 'G', icon: '📡',
    x: 1590, y: 320, requires: ['scheduled', 'app_dev'],
    achievement: 'Claude Codeのdispatch機能でタスクを外部から起動できる',
    howto: '1. Claude Codeの/dispatch または RemoteTrigger機能を確認\n2. 外部のイベント（Webhook等）からClaudeのタスクを起動する設定\n3. テスト用の簡単なタスクで動作確認する\n4. エラーハンドリングを設定する',
    verification: '外部イベントがClaudeのタスク実行を正しくトリガーできること',
    defaultNotes: ''
  },
  {
    id: 'external_svc', name: '外部サービス連携', group: 'G', icon: '🔗',
    x: 1590, y: 465, requires: ['dispatch'],
    achievement: 'ClaudeからAPIを呼び出して外部サービスと連携できる',
    howto: '1. 連携したい外部サービスのAPIキーを取得する\n2. 「〇〇のAPIを使って△△するスクリプトを書いて」と依頼\n3. Claudeに生成させたコードを実行して動作確認\n4. エラーが出たらClaudeに渡してデバッグ依頼',
    verification: 'Slackへの通知やGoogleスプレッドシート連携など実際に動くこと',
    defaultNotes: ''
  },
  {
    id: 'periodic', name: '定期実行', group: 'G', icon: '🔄',
    x: 1590, y: 610, requires: ['external_svc'],
    achievement: 'Claudeのタスクをcronなどで定期自動実行できる',
    howto: '1. 定期実行したい処理をClaudeと設計する\n2. Cron式でスケジュールを設定する（例: 毎朝8時）\n3. 実行ログを記録する仕組みをClaudeに作らせる\n4. 異常検知と通知の仕組みも追加する',
    verification: '設定した時刻に自動でタスクが実行され結果が通知されること',
    defaultNotes: ''
  },

  // ─────────────────────────────────────────
  // GROUP H: 高度応用
  // ─────────────────────────────────────────
  {
    id: 'subagent', name: 'サブエージェント作成', group: 'H', icon: '🤖',
    x: 1780, y: 200, requires: ['external_svc'],
    achievement: 'Claude Codeのサブエージェントを設定して動かせる',
    howto: '1. Claude Agent SDKの概要を学ぶ\n2. 「〇〇専用のサブエージェントを設計して」とClaudeに依頼\n3. エージェント定義ファイルを作成して動作テスト\n4. メインエージェントと連携させる',
    verification: '特定タスクをサブエージェントに委譲して結果が返ってくること',
    defaultNotes: ''
  },
  {
    id: 'custom_skill', name: '自作スキル作成', group: 'H', icon: '🔨',
    x: 1780, y: 350, requires: ['subagent', 'periodic'],
    achievement: '自分用のClaudeスキル（slash command）を作れる',
    howto: '1. 繰り返し使うプロンプトをスキルとして定義する\n2. .claude/skills/ ディレクトリにスキルファイルを作成\n3. Claudeに「このスキルの定義ファイルを作って」と依頼\n4. 動作テストして改善する',
    verification: 'カスタムスキルを呼び出すとタスクが正しく実行されること',
    defaultNotes: ''
  },
  {
    id: 'skill_improve', name: '自作スキル改善', group: 'H', icon: '✨',
    x: 1780, y: 500, requires: ['custom_skill'],
    achievement: '既存スキルをレビューして改善できる',
    howto: '1. 作ったスキルの問題点を記録しておく\n2. 「このスキルの改善点を分析して」とClaudeに依頼\n3. A/Bテスト的に2つのバージョンを比較する\n4. 改善した内容をドキュメント化する',
    verification: '改善前後でタスク成功率や速度が向上していること',
    defaultNotes: ''
  },
  {
    id: 'robot', name: 'ロボット製作への応用', group: 'H', icon: '🦾',
    x: 1780, y: 650, requires: ['skill_improve'],
    achievement: 'ClaudeをRaspberry Piなど物理デバイスと連携させられる',
    howto: '1. Raspberry Piにnodeをインストールしてclaude CLIを使えるようにする\n2. 「センサーデータを読んでClaudeに渡すコードを書いて」と依頼\n3. Claudeの判断結果でモーターやLEDを制御するコードを作成\n4. 小さな自動化デバイスを一つ完成させる',
    verification: '物理センサーの入力にClaudeが反応して機器を制御できること',
    defaultNotes: ''
  },
];

// ─────────────────────────────────────────
// 接続定義（from_id → to_id）
// ─────────────────────────────────────────
const CONNECTIONS = [
  // A 内部
  ['install',          'basic_ops'],
  ['basic_ops',        'safe_use'],
  // A → B
  ['basic_ops',        'proj_understanding'],
  // B 内部
  ['proj_understanding','spec_org'],
  ['spec_org',         'change_scope'],
  // B → C
  ['proj_understanding','task_today'],
  // C 内部
  ['task_today',       'schedule'],
  ['schedule',         'study_viz'],
  ['task_today',       'folder_org'],
  // B → D
  ['spec_org',         'excel'],
  // C → D
  ['folder_org',       'docs'],
  // D 内部
  ['excel',            'household'],
  ['household',        'expense'],
  ['docs',             'shift'],
  // D → E
  ['docs',             'blog_idea'],
  // E 内部
  ['blog_idea',        'blog_write'],
  ['blog_write',       'blog_post'],
  ['blog_post',        'x_post'],
  ['blog_idea',        'youtube'],
  ['youtube',          'video_edit'],
  ['video_edit',       'music'],
  // E → F
  ['blog_write',       'portfolio'],
  // F 内部
  ['portfolio',        'ec_site'],
  ['ec_site',          'app_dev'],
  ['app_dev',          'game_dev'],
  // F → G
  ['app_dev',          'dispatch'],
  // G 内部
  ['scheduled',        'dispatch'],
  ['dispatch',         'external_svc'],
  ['external_svc',     'periodic'],
  // G → H
  ['external_svc',     'subagent'],
  ['periodic',         'custom_skill'],
  // H 内部
  ['subagent',         'custom_skill'],
  ['custom_skill',     'skill_improve'],
  ['skill_improve',    'robot'],
];

// ─────────────────────────────────────────
// グループ定義
// ─────────────────────────────────────────
const GROUPS = {
  'A': { name: '初期セットアップ', color: '#5b8fff', x: 120 },
  'B': { name: '文脈理解',         color: '#b06aff', x: 320 },
  'C': { name: '日常タスク',       color: '#4adf8f', x: 520 },
  'D': { name: '事務・実務',       color: '#ffaa33', x: 795 },
  'E': { name: '発信・制作',       color: '#ff7070', x: 1130 },
  'F': { name: '開発',             color: '#00d4ff', x: 1400 },
  'G': { name: '連携・自動実行',   color: '#ff9ee0', x: 1590 },
  'H': { name: '高度応用',         color: '#ffd700', x: 1780 },
};
