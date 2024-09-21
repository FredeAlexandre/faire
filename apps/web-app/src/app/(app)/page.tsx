import PocketBase from "pocketbase";

import { base_url } from "~/pocketbase";
import { isAuth } from "~/pocketbase/server";
import LandingPage from "../landing/page";
import InboxPage from "./inbox/page";

export default function RootPage() {
  const pb = new PocketBase(base_url);

  if (isAuth(pb)) return <InboxPage />;
  return <LandingPage />;
}
