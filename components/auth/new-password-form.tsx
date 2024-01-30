"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import FormError from "@/components/form-error";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { newPassword, onRenderResetPassword } from "@/actions/new-password";
import FormSuccess from "../form-success";
import { Toaster } from "sonner";
export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const [error, setError] = useState<string | undefined>();
  const [user, setUser] = useState<any | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      ConfPassword: "",
    },
  });
  const onRender = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    onRenderResetPassword(token)
      .then((data) => {
        // setSuccess(data.success);
        if(!data.user){
          setError(data?.error as string);
        }
        setUser(data.user?.name)
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onRender();
  }, [onRender]);
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      newPassword(values,token||"").then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      title={`Hello!! ${user && user ? (user) : "" } Reset Your password`}
      description=" "
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
    >
      {error !== "Token Expired" ?(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ConfPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      ) : <FormError message="Token Expired"/>}
    </CardWrapper>
  );
};
