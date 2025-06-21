'use server';

import { z } from 'zod';
import { db } from '@/lib/mock-db';
import type { Article } from '@/lib/types';

const SearchSchema = z.object({
  query: z
    .string()
    .min(2, 'クエリは2文字以上で入力してください')
    .max(100, 'クエリは100文字以下で入力してください'),
  category: z.string().optional(),
});

export type SearchResult =
  | {
      success: true;
      data: {
        articles: Article[];
        query: string;
        category?: string;
        total: number;
      };
    }
  | {
      success: false;
      errors: Record<string, string[]>;
    };

export async function searchArticles(
  formData: FormData
): Promise<SearchResult> {
  try {
    const queryValue = formData.get('query');
    const categoryValue = formData.get('category');

    const rawData = {
      query: queryValue ?? '',
      category: categoryValue ? String(categoryValue) : undefined,
    };

    const result = SearchSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { query, category } = result.data;

    // Mock DBから検索実行
    const articles = await db.searchArticles(query, { category });

    return {
      success: true,
      data: {
        articles,
        query,
        category,
        total: articles.length,
      },
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      success: false,
      errors: {
        root: ['検索中にエラーが発生しました'],
      },
    };
  }
}
