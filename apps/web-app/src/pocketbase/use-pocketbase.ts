"use client";

import * as React from "react";

import { PocketBaseContext } from "./pocketbase-provider";

export const usePocketBase = () => {
  const context = React.useContext(PocketBaseContext);

  if (!context) {
    throw new Error(
      "PocketBaseContext must be used within a PocketBaseProvider",
    );
  }

  return context;
};
