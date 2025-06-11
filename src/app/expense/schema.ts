import { z } from 'zod';

const expenseItemSchema = z.object({
  category: z
    .string()
    .min(1, '費目を入力してください')
    .max(50, '費目は50文字以内で入力してください'),
});

export const expenseFormSchema = z.object({
  items: z
    .array(expenseItemSchema)
    .min(1, '最低1つの費目を入力してください')
    .max(10, '費目は最大10個まで入力可能です'),
});

export type ExpenseItem = z.infer<typeof expenseItemSchema>;
export type ExpenseFormData = z.infer<typeof expenseFormSchema>;
