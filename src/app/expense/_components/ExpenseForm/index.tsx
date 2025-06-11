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

  const [items, setItems] = useState([
    {
      id: 1,
      category: '',
      amount: 0,
      usageDate: '',
      hasReceipt: false,
    },
  ]);

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
      setItems([
        ...items,
        {
          id: Date.now(),
          category: '',
          amount: 0,
          usageDate: '',
          hasReceipt: false,
        },
      ]);
    }
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (
    id: number,
    field: string,
    value: string | number | boolean
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const isFormValid = () => {
    return items.every((item) => {
      return (
        item.category.trim() !== '' && item.amount > 0 && item.usageDate !== ''
      );
    });
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
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-700">
                  費目 {index + 1}
                </h4>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="small"
                    onClick={() => removeItem(item.id)}
                  >
                    削除
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name={`items[${index}].category`}
                  defaultValue={item.category}
                  label="費目"
                  placeholder="例: 交通費、会議費、備品購入費など"
                  required
                  fullWidth
                  onChange={(e) =>
                    updateItem(item.id, 'category', e.target.value)
                  }
                />

                <Input
                  name={`items[${index}].amount`}
                  type="number"
                  defaultValue={item.amount || ''}
                  label="金額"
                  placeholder="例: 1500"
                  required
                  fullWidth
                  min="1"
                  max="1000000"
                  onChange={(e) =>
                    updateItem(item.id, 'amount', parseInt(e.target.value) || 0)
                  }
                />

                <Input
                  name={`items[${index}].usageDate`}
                  type="date"
                  defaultValue={item.usageDate}
                  label="利用日付"
                  required
                  fullWidth
                  max={new Date().toISOString().split('T')[0]}
                  min={
                    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split('T')[0]
                  }
                  onChange={(e) =>
                    updateItem(item.id, 'usageDate', e.target.value)
                  }
                />

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="hidden"
                    name={`items[${index}].hasReceipt`}
                    value="false"
                  />
                  <input
                    type="checkbox"
                    id={`items[${index}].hasReceipt`}
                    name={`items[${index}].hasReceipt`}
                    defaultChecked={item.hasReceipt}
                    value="true"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={(e) =>
                      updateItem(item.id, 'hasReceipt', e.target.checked)
                    }
                  />
                  <label
                    htmlFor={`items[${index}].hasReceipt`}
                    className="text-sm font-medium text-gray-700"
                  >
                    領収書あり
                  </label>
                </div>
              </div>
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
            disabled={isPending || !isFormValid()}
          >
            {isPending ? '送信中...' : '申請する'}
          </Button>
        </div>
      </form>
    </div>
  );
}
