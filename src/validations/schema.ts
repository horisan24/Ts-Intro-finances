import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  date: z.string().min(1, {message: "日付を入力してください"}),
  amount: z.number().min(1, {message: "金額は1円以上で入力してください"}),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内で入力してください" }),
  category: z.union([
    z.enum(["給与", "副収入", "お小遣い"]),
    z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費"]),
    z.literal(""),
  ]).refine((val) => val !== "", {message: "カテゴリーを選択してください"}),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
