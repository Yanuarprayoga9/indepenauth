"use server";
import { getTokenByToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields" };
 
  const { password, ConfPassword } = validatedFields.data;
 
 
  if (password !== ConfPassword) return { error: "Password not match" };
 
 
  const existingToken = await getTokenByToken(token);
  if (!existingToken) return { error: "Token Invalid" };
 
 
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token Expired" };
  const user = await getUserByEmail(existingToken.email)
  if(!user) return {error:"Something Went Wrong"}
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where:{
      id:user.id
    },
    data:{
      password:hashedPassword
    }
  })
  await db.passwordResetToken.delete({
    where:{
      id:existingToken.id
    }
  })

  return { success: "Password Change Successfully" };
};




export const onRenderResetPassword = async (token: string) => {
  if (!token) return { error: "missing token" };
  const existingToken = await getTokenByToken(token);
  if (!existingToken) return { error: "Token Invalid" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token Expired" };
  const user = await getUserByEmail(existingToken.email);
  return { user };
};
