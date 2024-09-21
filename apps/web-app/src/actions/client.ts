import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

export const client = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof z.ZodError) {
      const errors = e.issues.map((issue) => {
        return issue.message;
      });
      return errors.join("\n");
    }

    if (e instanceof ClientResponseError) {
      return e.message;
    }

    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
