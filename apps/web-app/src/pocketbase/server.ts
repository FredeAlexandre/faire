import type PocketBase from "pocketbase";
import { cookies } from "next/headers";

export function isAuth(pb: PocketBase) {
  const pb_auth = cookies().get("pb_auth");
  if (!pb_auth) return false;
  pb.authStore.loadFromCookie(`${pb_auth.name}=${pb_auth.value}`);
  return pb.authStore.isValid;
}
