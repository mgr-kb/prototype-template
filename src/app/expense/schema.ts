import { z } from 'zod';

export const expenseFormSchema = z.object({
  category: z
    .string()
    .min(1, '費目を入力してください')
    .max(50, '費目は50文字以内で入力してください'),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;
