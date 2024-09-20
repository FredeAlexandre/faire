"use client";

import PocketBase from "pocketbase";

export function createPocketBase() {
  return new PocketBase("http://127.0.0.1:8080");
}
