"use client";

import { useRouter } from "next/navigation";
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

import { registerAction } from "~/actions/register.action";
import { registerSchema } from "~/actions/register.schema";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    schema: registerSchema,
    defaultValues: { email: "", password: "" },
  });

  const { executeAsync: register } = useAction(registerAction, {
    onSuccess: () => {
      toast.success("Success ! You are now logged in.");
      router.push("/");
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error("Failed authentificate", {
          description: error.serverError,
        });
      } else {
        toast.error("Failed auth. Something went wrong.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(register)}
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirm</FormLabel>
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
