import { z } from "zod";

const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_IMG_TYPE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

const formSchema = z.object({
  username: z.string().min(1, { message: "名前は必須です" }),
  subject: z.string().min(1, { message: "件名は必須です" }),
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  message: z
    .string()
    .min(1, { message: "メッセージは必須です" })
    .max(160, { message: "メッセージは160文字以内で入力してください" }),
  file: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, "ファイル画像が必要です")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `ファイルサイズは${MAX_MB}MB以下です`)
    .refine(
      (files) => ACCEPTED_IMG_TYPE.includes(files?.[0]?.type),
      ".jpeg, .jpg, .png, .webpのファイルのみご利用できます"
    )
});

export { formSchema };
