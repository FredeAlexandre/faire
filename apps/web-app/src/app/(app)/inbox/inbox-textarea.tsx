"use client";

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@faire/ui/button";
import { Textarea } from "@faire/ui/textarea";

import { usePocketBase } from "~/pocketbase/use-pocketbase";

export function InboxTextarea() {
  const pb = usePocketBase();

  const ref = React.useRef<HTMLFormElement>(null);

  const [content, setContent] = React.useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async (content: string) => {
      if (!pb.authStore.model)
        throw Error(
          "You'r not connected to application this action can't be performed",
        );

      return (
        pb
          .collection("inbox_entries")
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          .create({ user: pb.authStore.model.id, content })
      );
    },
  });

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        mutateAsync(content)
          .then(() => {
            setContent("");
          })
          .catch((err: Error) => {
            toast.error(`${err.message}`);
          });
      }}
      className="space-y-2 pt-4"
    >
      <div className="space-y-1">
        <Textarea
          rows={20}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.shiftKey == false) {
              e.preventDefault();
              if (ref.current) ref.current.requestSubmit();
            }
          }}
          placeholder="Create a placeholder here which change on each render with a predefine list of examples"
        />
      </div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={content == ""}
          onClick={() => {
            setContent("");
          }}
        >
          Clear
        </Button>
        <Button type="submit" disabled={content == ""} className="w-[10rem]">
          Save
        </Button>
      </div>
    </form>
  );
}
