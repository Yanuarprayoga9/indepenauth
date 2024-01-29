import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByUserId = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
