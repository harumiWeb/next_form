import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/formSchema";
import { z } from "zod";
import { useCallback } from "react";

export const useMailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
    subject: "",
    email: "",
    message: "",
    file: undefined,
  },
});

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const { username, subject, email, message, file } = values;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("subject", subject);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("file", file?.[0]);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/send`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }, [])

  return { form, onSubmit }
}