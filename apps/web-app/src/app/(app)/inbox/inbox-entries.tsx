"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import type PocketBase from "pocketbase";
import * as React from "react";
import {
  DndContext,
  pointerWithin,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@faire/ui";
import { Button } from "@faire/ui/button";

import { queryClient } from "~/components/query-client-provider";
import { usePocketBase } from "~/pocketbase/use-pocketbase";

function Entry({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: number | string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          "w-full cursor-grab space-y-1 whitespace-pre rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
          {
            "cursor-grabbing": isDragging,
          },
        )}
      >
        {children}
      </div>
    </>
  );
}

function EntryContent({ children }: { children?: string }) {
  return <div>{children}</div>;
}

function Box({
  id,
  children,
  className,
}: {
  id: string | number;
  children?: React.ReactNode;
  className?: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background py-6 text-sm font-medium shadow-sm transition-colors",
        {
          "bg-accent text-accent-foreground": isOver,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

async function TrashBoxHandleEntry({
  item,
  pb,
}: {
  item: string;
  pb: PocketBase;
}) {
  await pb.collection("inbox_entries").update(item, { trash: true });
  await queryClient.invalidateQueries({ queryKey: ["entries"] });
}

function EntriesList() {
  const pb = usePocketBase();

  const { data } = useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      return pb
        .collection("inbox_entries")
        .getList(1, 50, { filter: "trash = false" });
    },
  });

  if (!data || data.items.length == 0)
    return (
      <div className="pt-10 text-center">
        Add entries by writing down your though in the inbox tab
      </div>
    );

  return (
    <div className="space-y-2">
      {data.items.map((data) => {
        return (
          <Entry key={data.id} id={data.id}>
            <EntryContent>{data.content}</EntryContent>
          </Entry>
        );
      })}
    </div>
  );
}

export function InboxEntries() {
  const pb = usePocketBase();

  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || typeof event.active.id == "number") return;
    if (event.over.id == "trash")
      return TrashBoxHandleEntry({ item: event.active.id, pb });
  }

  return (
    <div className="space-y-6 pt-4">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {/** Faire comme si c'etait des boutons carres */}
          <Box id="actions">Actions</Box>
          <Box id="events">Events</Box>
          <Box id="delegated">Delegated</Box>
          <Box id="trash">Trash</Box>
          <div className="col-span-4 flex w-full flex-col rounded-md border border-input bg-background p-4 text-sm font-medium shadow-sm transition-colors">
            <div className="flex w-full items-center justify-between">
              <div>Projects</div>
              <Button size="sm">Add project</Button>
            </div>

            <div className="flex flex-col gap-1 pt-4">
              <Entry id={"fefezf"}>
                <EntryContent>Faire</EntryContent>
              </Entry>
              <Entry id={"fefezccf"}>
                <EntryContent>Faire</EntryContent>
              </Entry>
              <Entry id={"fefezfxx"}>
                <EntryContent>Faire</EntryContent>
              </Entry>
            </div>
          </div>
        </div>
        <EntriesList />
      </DndContext>
    </div>
  );
}
