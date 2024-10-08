import { redirect } from "next/navigation";
import PocketBase from "pocketbase";

import { base_url } from "~/pocketbase";
import { isAuth } from "~/pocketbase/server";
import ClientPage from "./page.client";

export default function LoginPage() {
  const pb = new PocketBase(base_url);

  if (isAuth(pb)) redirect("/inbox");

  return <ClientPage />;
}
