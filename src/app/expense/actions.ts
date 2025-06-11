'use server';

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { expenseFormSchema } from './schema';

export async function submitExpenseForm(
  _prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: expenseFormSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  // 実際の処理では、データベースに保存するなどの処理を行う
  console.log('経費精算データ:', submission.value);

  // 成功時は成功ページにリダイレクト（今は同じページ）
  redirect('/expense?success=true');
}
