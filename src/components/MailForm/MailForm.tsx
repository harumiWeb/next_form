"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMailForm } from "@/hooks/useMailForm";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const MailForm = () => {
  const { form, onSubmit } = useMailForm();
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast.success("メールを送信しました");
      
      // カスタムの初期値を設定
      const defaultValues = {
        username: "",
        subject: "",
        email: "",
        message: "",
      };
      
      form.reset(defaultValues);
      
      // ファイルフィールドを手動でリセット
      form.setValue('file', null!);
    }
  }, [form.formState.isSubmitSuccessful]);
  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="container px-[4%] flex flex-col gap-3 max-w-[900px] mx-auto mt-10">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田太郎" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>件名</FormLabel>
              <FormControl>
                <Input placeholder="件名" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>お問い合わせ内容</FormLabel>
              <FormControl>
                <Textarea placeholder="お問い合わせ内容を入力してください" {...field} rows={5}/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="mt-4">
              <FormLabel>添付画像</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files || null);
                  }}
                  value={value ? undefined : ''}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                5MB以下の.jpeg, .jpg, .png, .webpファイルをアップロードしてください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <ClipLoader size={20} color="#fff" /> : "送信"}
        </Button>
      </form>
    </Form>
  );
};

export default MailForm;
