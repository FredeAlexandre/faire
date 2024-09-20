"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Button } from "@faire/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@faire/ui/form";
import { Input } from "@faire/ui/input";

import { loginAction } from "~/actions/login.action";
import { loginSchema } from "~/actions/login.schema";

export default function LoginPage() {
  const form = useForm({
    schema: loginSchema,
    defaultValues: { email: "", password: "" },
  });

  const { executeAsync: login } = useAction(loginAction, {
    onSuccess: () => {
      toast("Success");
    },
    onError: () => {
      toast("Failed");
    },
  });

  return (
    <div className="flex items-center justify-center pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(login)}
          className="w-[20rem] space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jhon@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
