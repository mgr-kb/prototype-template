'use client';

import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { submitExpenseForm } from '../../actions';
import { expenseFormSchema } from '../../schema';

export function ExpenseForm() {
  const [lastResult, action, isPending] = useActionState(
    submitExpenseForm,
    undefined
  );

  const [items, setItems] = useState([{ id: 1, category: '' }]);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: expenseFormSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const addItem = () => {
    if (items.length < 10) {
      setItems([...items, { id: Date.now(), category: '' }]);
    }
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, category: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, category } : item))
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">経費精算申請</h2>

      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">費目一覧</h3>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={addItem}
              disabled={items.length >= 10}
            >
              + 行を追加
            </Button>
          </div>

          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <Input
                  name={`items[${index}].category`}
                  defaultValue={item.category}
                  label={`費目 ${index + 1}`}
                  placeholder="例: 交通費、会議費、備品購入費など"
                  required
                  fullWidth
                  onChange={(e) => updateItem(item.id, e.target.value)}
                />
              </div>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="small"
                  onClick={() => removeItem(item.id)}
                  className="mt-8"
                >
                  削除
                </Button>
              )}
            </div>
          ))}

          {fields.items.errors && (
            <p className="text-red-600 text-sm">{fields.items.errors[0]}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? '送信中...' : '申請する'}
          </Button>
        </div>
      </form>
    </div>
  );
}
