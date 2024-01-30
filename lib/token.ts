import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getTokenByEmail } from "@/data/token";
import { sendResetMailtoken } from "./mail";
export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  console.log({ token });
  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  await sendResetMailtoken(email, token);
};
