import baseConfig, { restrictEnvAccess } from "@faire/eslint-config/base";
import nextjsConfig from "@faire/eslint-config/nextjs";
import reactConfig from "@faire/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**", "public"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
