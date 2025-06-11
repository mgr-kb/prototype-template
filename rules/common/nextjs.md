## React

### コンポーネント

- コンポーネント種類
  - Server Components (デフォルト利用)
  - Client Components
  - 非同期コンポーネント (with Suspense)
- コンポーネントカタログ
  - Storybook
- スタイリング
  - tailwind.css
  - clsx, tailwind mergeなどを利用する
- アクセシビリティ
  - セマンティックHTML
  - キーボード操作サポート

#### コンポーネントのディレクトリ構造について

共通コンポーネントの場合、`src/components/(コンポーネント名)/**`のように管理する。
機能/ページ専用のコンポーネントである場合、`src/app/(機能/ページ名)/_components/(コンポーネント名)/**`のように管理する。

各`(コンポーネント名)`配下のファイル構造は、下記のようにする。

- index.tsx (コンポーネント実装)
- index.stories.tsx (Storybook)
- index.test.tsx (Unit Test)

#### Server Component / Client Component

`page.tsx`で `use client`を扱ってはいけない。
デフォルトでServer Componentを利用する。
`use client`を扱うケースは下記のようなケース。

- クライアントサイド処理 (イベントリスナー, ブラウザAPI, 状態管理などクライアントでの操作が要求される場合のみに利用)
- サードパーティコンポーネント
- RSC Payload転送量の削減

どうしても `use client`をコンポーネントツリーの中でルートに近い階層で用いる場合には、Composition patternを用いる。

```tsx
// side-menu.tsx
'use client';

import { useState } from 'react';

// `children`に`<UserInfo>`などのServer Componentsを渡すことが可能！
export function SideMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}
      <div>
        <button type="button" onClick={() => setOpen((prev) => !prev)}>
          toggle
        </button>
        <div>...</div>
      </div>
    </>
  );
}
```

```tsx
// page.tsx
import { UserInfo } from './user-info'; // Server Components
import { SideMenu } from './side-menu'; // Client Components

/**
 * Client Components(`<SideMenu>`)の子要素として
 * Server Components(`<UserInfo>`)を渡せる
 */
export function Page() {
  return (
    <div>
      <SideMenu>
        <UserInfo />
      </SideMenu>
      <main>{/* ... */}</main>
    </div>
  );
}
```

### カスタムHooks

- あくまでもコンポーネント自身の結合度が低くなるようにすることが目的
- 凝集度は高くあるべき
- コンポーネントの見通しをよくするためのもの

### エラーハンドリング

- ErrorBoundaryを利用する
- 非同期コンポーネントの場合はSuspenseなどを活用する

## Next.js

### App Routerを採用

- API Routesは基本的に採用しない
- サーバー処理はServer Actionsを利用する
- page.tsxは必ずServer Componentsにする

### データフェッチ

- Server Componentsによるデータフェッチを行う
- fetchは`*.tsx`のようなファイルから直接行うのではなく、fetcherは `app/**/fetcher.ts`に共通関数として用意しておき、exportして利用する

### ユーザーアクション

- ユーザーによるアクションを伴う処理(C/U/D)には、`Server Actions`と`useActionsState()`を利用する。
- ユーザー操作に伴ってデータを操作・更新を行なって、その後の結果を再度取得したい場合には、`revalidatePath()`と`revalidateTag()`を用いる。

### フォーム

- conform + 制御コンポーネントを利用する
- スキーマ検証はzodを利用する
  - クライアント/サーバーで両方チェックする

### 組み込みコンポーネント

- 画像最適化のための `Image` コンポーネント
- クライアントサイドナビゲーションのための `Link` コンポーネント
- 外部スクリプトのための `Script` コンポーネント
- メタデータのための `Head` コンポーネント
