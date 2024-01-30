"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetMailtoken = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_APP_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "next_auth <onboarding@resend.dev>",
    to: email,
    subject: "hello world",
    html: `<p><a href=${resetLink}>click me</a></p>`,
  });
};
