import type { DragEndEvent } from "@dnd-kit/core";
import type { QueryClient } from "@tanstack/react-query";
import type PocketBase from "pocketbase";
import { useDroppable } from "@dnd-kit/core";

import { cn } from "@faire/ui";

export const id = "trash";

export function Box() {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background py-6 text-sm font-medium shadow-sm transition-colors",
        {
          "bg-accent text-accent-foreground": isOver,
        },
      )}
    >
      Trash
    </div>
  );
}

export async function handleDragEnd({
  event,
  pb,
  queryClient,
}: {
  event: DragEndEvent;
  pb: PocketBase;
  queryClient: QueryClient;
}) {
  if (typeof event.active.id == "number") return;
  await pb.collection("inbox_entries").update(event.active.id, { trash: true });
  await queryClient.invalidateQueries({ queryKey: ["entries"] });
}
