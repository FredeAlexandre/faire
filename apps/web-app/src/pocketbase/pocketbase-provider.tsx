"use client";

import * as React from "react";
import PocketBase from "pocketbase";

import { base_url } from ".";

export const PocketBaseContext = React.createContext<PocketBase | null>(null);

export const PocketBaseProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <PocketBaseContext.Provider value={new PocketBase(base_url)}>
      {children}
    </PocketBaseContext.Provider>
  );
};
