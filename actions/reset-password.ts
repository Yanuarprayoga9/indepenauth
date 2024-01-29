"use server";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "invalid Fields" };
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "User Not Found" };

  return { success: `Email sent to ${email}` };
};
