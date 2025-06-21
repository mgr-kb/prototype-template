'use client';

import { useRouter } from 'next/navigation';
import {
  useForm,
  getFormProps,
  getInputProps,
  getSelectProps,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import type { Category } from '@/lib/types';

const SearchFormSchema = z.object({
  query: z
    .string()
    .min(2, 'クエリは2文字以上で入力してください')
    .max(100, 'クエリは100文字以下で入力してください'),
  category: z.string().optional(),
});

interface SearchFormProps {
  categories?: Category[];
  initialQuery?: string;
  initialCategory?: string;
}

export function SearchForm({
  categories,
  initialQuery = '',
  initialCategory = '',
}: SearchFormProps) {
  const router = useRouter();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SearchFormSchema });
    },
    onSubmit(event, { formData }) {
      event.preventDefault();

      const result = parseWithZod(formData, { schema: SearchFormSchema });

      if (result.status === 'success') {
        const searchParams = new URLSearchParams();
        searchParams.set('q', result.value.query);

        if (result.value.category) {
          searchParams.set('category', result.value.category);
        }

        router.push(`/search?${searchParams.toString()}`);
      }
    },
    defaultValue: {
      query: initialQuery,
      category: initialCategory || '',
    },
  });

  return (
    <form
      {...getFormProps(form)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <div className="space-y-4">
        {/* 検索入力フィールド */}
        <div>
          <label
            htmlFor={fields.query.id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            検索キーワード
          </label>
          <input
            {...getInputProps(fields.query, { type: 'text' })}
            placeholder="記事を検索..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {fields.query.errors && (
            <p className="mt-1 text-sm text-red-600">
              {fields.query.errors.join(', ')}
            </p>
          )}
        </div>

        {/* カテゴリフィルター */}
        {categories && categories.length > 0 && (
          <div>
            <label
              htmlFor={fields.category.id}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              カテゴリ
            </label>
            <select
              {...getSelectProps(fields.category)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">全て</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 検索ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          検索
        </button>

        {/* フィールドエラーメッセージ */}
        {form.errors && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{form.errors.join(', ')}</p>
          </div>
        )}
      </div>
    </form>
  );
}
