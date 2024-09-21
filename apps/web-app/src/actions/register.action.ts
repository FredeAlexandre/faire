"use server";

import { cookies } from "next/headers";
import PocketBase from "pocketbase";

import { base_url, getValueFromCookie } from "~/pocketbase";
import { client } from "./client";
import { registerSchema } from "./register.schema";

export const registerAction = client
  .schema(registerSchema)
  .action(async ({ parsedInput: { email, password, passwordConfirm } }) => {
    const pb = new PocketBase(base_url);

    await pb.collection("users").create({ email, password, passwordConfirm });
    await pb.collection("users").authWithPassword(email, password);

    const value = getValueFromCookie(pb.authStore.exportToCookie());

    if (!value) throw new Error("Failed to extract value from cookie");

    cookies().set("pb_auth", value, {
      maxAge: 1209600,
      sameSite: "strict",
      secure: true,
      httpOnly: false,
    });
  });
