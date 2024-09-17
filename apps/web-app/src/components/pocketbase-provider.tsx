"use client";

import * as React from "react";

import { pb } from "@faire/pocketbase";
import { PocketBaseProvider as RealPocketBaseProvider } from "@faire/pocketbase/client";

export function PocketBaseProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <RealPocketBaseProvider pb={pb}>{children}</RealPocketBaseProvider>;
}
