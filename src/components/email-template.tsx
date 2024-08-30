import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  subject: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  subject,
  email,
  message,
}) => (
  <div>
    <h1>お問い合わせがありました</h1>
    <p>【お名前】</p>
    <p>{username}</p>
    <p>【件名】</p>
    <p>{subject}</p>
    <p>【メールアドレス】</p>
    <p>{email}</p>
    <p>【メッセージ】</p>
    <p>{message}</p>
  </div>
);
