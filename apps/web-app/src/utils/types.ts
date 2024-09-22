import type {
  HookBaseUtils,
  HookCallbacks,
  HookSafeActionFn,
} from "next-safe-action/hooks";

export type UtilsFor<Fn> =
  Fn extends HookSafeActionFn<
    infer ServerError,
    infer S,
    infer BAS,
    infer CVE,
    infer CBAVE,
    infer Data
  >
    ? HookBaseUtils<S> & HookCallbacks<ServerError, S, BAS, CVE, CBAVE, Data>
    : never;
