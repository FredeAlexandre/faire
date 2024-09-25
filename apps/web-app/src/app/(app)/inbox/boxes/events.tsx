import type { DragEndEvent } from "@dnd-kit/core";
import type { QueryClient } from "@tanstack/react-query";
import type PocketBase from "pocketbase";
import { useDroppable } from "@dnd-kit/core";
import { Calendar } from "lucide-react";

import { cn } from "@faire/ui";

export const id = "events";

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
      <div className="flex items-center gap-1">
        <Calendar size={14} /> Events
      </div>
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

  const data = await pb.collection("inbox_entries").getOne(event.active.id);
  const { content } = data;

  if (
    pb.authStore.model == null ||
    typeof pb.authStore.model.id != "string" ||
    typeof content != "string"
  )
    return;

  await pb
    .collection("events")
    .create({ user: pb.authStore.model.id, title: content });
  await pb.collection("inbox_entries").delete(event.active.id);
  await queryClient.invalidateQueries({ queryKey: ["entries"] });
}
