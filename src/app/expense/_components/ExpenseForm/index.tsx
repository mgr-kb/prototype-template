'use client';

import { useActionState } from 'react';
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

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: expenseFormSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">経費精算申請</h2>

      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="space-y-4"
      >
        <Input
          key={fields.category.key}
          name={fields.category.name}
          defaultValue={fields.category.initialValue}
          label="費目"
          placeholder="例: 交通費、会議費、備品購入費など"
          required
          fullWidth
          error={!fields.category.valid}
          errorMessage={fields.category.errors?.[0]}
          helperText="経費の種類を入力してください"
        />

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
