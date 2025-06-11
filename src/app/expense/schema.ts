import { z } from 'zod';

const expenseItemSchema = z.object({
  category: z
    .string()
    .min(1, '費目を入力してください')
    .max(20, '費目は20文字以内で入力してください'),
  amount: z
    .number({
      required_error: '金額を入力してください',
      invalid_type_error: '金額は数値で入力してください',
    })
    .min(1, '金額は1以上で入力してください')
    .max(1000000, '金額は1,000,000以下で入力してください')
    .int('金額は整数で入力してください'),
  usageDate: z
    .date({
      required_error: '利用日付を選択してください',
      invalid_type_error: '有効な日付を選択してください',
    })
    .refine((date) => {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setDate(today.getDate() - 365);
      return date >= oneYearAgo && date <= today;
    }, '利用日付は過去365日以内で選択してください'),
  hasReceipt: z.coerce.boolean().default(false),
});

export const expenseFormSchema = z.object({
  items: z
    .array(expenseItemSchema)
    .min(1, '最低1つの費目を入力してください')
    .max(10, '費目は最大10個まで入力可能です'),
});

export type ExpenseItem = z.infer<typeof expenseItemSchema>;
export type ExpenseFormData = z.infer<typeof expenseFormSchema>;
