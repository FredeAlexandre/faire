import * as React from "react";
import PocketBase from "pocketbase";

import { FloatingNavbar } from "~/components/floating-navbar";
import { base_url } from "~/pocketbase";
import { isAuth } from "~/pocketbase/server";

export default function RootLayout(props: { children: React.ReactNode }) {
  const pb = new PocketBase(base_url);

  return (
    <>
      {props.children}
      {isAuth(pb) ? <FloatingNavbar /> : null}
    </>
  );
}
