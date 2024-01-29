"use client";
import React, { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

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
import { login } from "@/actions/login";
import FormError from "@/components/form-error";
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    setTransition(() => {
      login(values).then((data) => {
        data?.error ? setError(data.error) : null;
      });
    });
  };
  return (
    <CardWrapper
      title="Welcome Back"
      description="login"
      backButtonHref="/auth/register"
      backButtonLabel="don't have an account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="shadcn" {...field} />
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
          <FormError message={error} />
          <Button type="submit" className="w-full"  disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
