import { db } from "@/lib/db";

export const getTokenByEmail = async (email: string) => {
  try {
    const token = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const getTokenByToken = async (token: string) => {
  try {
    const tk = await db.passwordResetToken.findFirst({
      where: { token },
    });
    return tk;
  } catch (error) {
    return null;
  }
};
