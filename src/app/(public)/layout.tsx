import { ReactNode } from 'react';
import Link from 'next/link';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Tech Blog</h1>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-gray-900">
                    ホーム
                  </Link>
                </li>
                <li>
                  <a
                    href="/articles"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    記事一覧
                  </a>
                </li>
                <li>
                  <a
                    href="/search"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    検索
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-screen">{children}</main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Tech Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
