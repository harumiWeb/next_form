import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username");
  const subject = formData.get("subject");
  const email = formData.get("email");
  const message = formData.get("message");
  const file = formData.get("file") as File;

  const fileBuffer = Buffer.from(await file?.arrayBuffer());

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["ganaharumi@outlook.jp"],
      subject: "フォーム開発相談のメールが届きました",
      react: EmailTemplate({
        username: username as string,
        subject: subject as string,
        email: email as string,
        message: message as string,
      }),
      attachments: [{
        filename: file.name,
        content: fileBuffer,
      }]
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
