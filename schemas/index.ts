
import * as z from "zod";


export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email Is Required",
  })
});
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email Is Required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name Is Required",
  }),
  email: z.string().email({
    message: "Email Is Required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
