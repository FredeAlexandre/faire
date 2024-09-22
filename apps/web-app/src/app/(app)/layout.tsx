import * as React from "react";

import { FloatingNavbar } from "~/components/floating-navbar";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <FloatingNavbar />
    </>
  );
}
