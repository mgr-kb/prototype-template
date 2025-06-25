# ルールファイルについて 2025/6/10 update

## 目次

- [共通の考え方](#共通の考え方)
- [Claude Code](#claude-code)
  - [プロジェクトメモリ](#プロジェクトメモリ)
  - [ユーザーメモリ](#ユーザーメモリ)
- [Cursor](#cursor)
  - [Project Rules](#project-rules)
- [Cline](#cline)
  - [Global Rules](#global-rules)
  - [Workspace Rules](#workspace-rules)

いくつかのツールごとにおけるルールファイルについて整理する。
本ディレクトリに存在する`*.md`は各ツールごとに適切に配置すること。

※必要に応じて更新します

## 共通の考え方

- ファイル分割を行うにあたっては、500行以内を目安に考える (from Cursor)
- 具体的な例や参考ファイルの提供も検討する
- markdown(`.md`, `.mdc`)ファイルを組み立てるにあたっては、見出し・セクションが明確に区切られており、文書構造が適切になることを意識する。

## Claude Code

[Cluadeのメモリを管理する](https://docs.anthropic.com/ja/docs/claude-code/memory)
※ローカルメモリは記載しません。必要に応じてドキュメントを確認の上利用します。

基本的にはプロジェクトメモリとして `CLAUDE.md`を準備して、importを用いて構成する形をとります。

### プロジェクトメモリ

`./CLAUDE.md` に管理する。
プロジェクトアーキテクチャ、コーディング標準などを管理する。

ルールのmdファイルを下記のようにimportすることで複数のruleファイルによる構成が可能となる。

```
プロジェクト概要は@READMEを、このプロジェクトで利用可能なnpmコマンドは@package.jsonを参照してください。

# 追加指示
- gitワークフロー @docs/git-instructions.md
```

### ユーザーメモリ

`~/.claude/CLAUDE.md` に管理する。
コードスタイル設定、個人的なツールのショートカットなどを管理する。

※個人環境への依存のため、本テンプレートではこの項はあまり気にしないで良いかも。

## gemini-cli

https://github.com/google-gemini/gemini-cli/tree/main

### Rules

`./GEMINI.md`を配置する。

Claude Codeの`CLAUDE.md`と同様に、ファイル参照は `@filepath`で参照できる。

```
プロジェクト概要は@READMEを、このプロジェクトで利用可能なnpmコマンドは@package.jsonを参照してください。

# 追加指示
- gitワークフロー @docs/git-instructions.md
```

## Cursor

[Rules](https://docs.cursor.com/context/rules)

### Project Rules

`.cursor/rules`配下に `*.mdc`ファイルとして まとめられます。
Claude Codeの`CLAUDE.md`と同様、`@***`によるファイルの参照が可能です。

## Cline

[Cline rules](https://docs.cline.bot/features/cline-rules)

※ ruleバンクなどを活用できるかもしれないが、現時点では特に掘り下げない。

### Global Rules

`/Document/Cline/Rules`に保存されるもの。
Claude Codeにおけるユーザーメモリに近いイメージで良さそう。

### Workspace Rules

基本的にはこちらを使う想定。

`.clinerules/`ディレクトリ配下にルールとなるmdファイルが保存される。
importなどは不要で、分割されたファイルをClineが統合的に把握してくれるとのこと。
