"use client";

import type PocketBase from "pocketbase";
import * as React from "react";

export const PocketBaseContext = React.createContext<PocketBase | null>(null);

export const PocketBaseProvider = ({
  children,
  pb,
}: {
  children?: React.ReactNode;
  pb: PocketBase;
}) => {
  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
};

export const usePocketBase = () => {
  const context = React.useContext(PocketBaseContext);

  if (!context) {
    throw new Error(
      "PocketBaseContext must be used within a PocketBaseProvider",
    );
  }

  return context;
};
