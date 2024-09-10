"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import * as React from "react";
import {
  DndContext,
  pointerWithin,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useMutation, useQuery } from "@tanstack/react-query";

import { pb } from "@faire/pocketbase";
import { cn } from "@faire/ui";
import { Button } from "@faire/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@faire/ui/tabs";
import { Textarea } from "@faire/ui/textarea";

import { queryClient } from "~/components/query-client-provider";

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

function Box<T>({
  id,
  children,
}: {
  id: string | number;
  children?: React.ReactNode;
  onDeposit?: (item: T) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background py-10 text-sm font-medium shadow-sm transition-colors",
        {
          "bg-accent text-accent-foreground": isOver,
        },
      )}
    >
      {children}
    </div>
  );
}

function TrashBox() {
  return (
    <Box
      onDeposit={(item) => {
        console.log(item);
      }}
      id="trash"
    >
      Trash
    </Box>
  );
}

async function TrashBoxHandleEntry(item: string) {
  await pb.collection("inbox_entries").update(item, { trash: true });
  await queryClient.invalidateQueries({ queryKey: ["entries"] });
}

function EntriesList() {
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

function InboxTextarea() {
  const ref = React.useRef<HTMLFormElement>(null);

  const [content, setContent] = React.useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async (content: string) => {
      if (!pb.authStore.model) return false;

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
          .catch((err) => {
            console.error(err);
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
          onClick={() => {
            setContent("");
          }}
        >
          Clear
        </Button>
        <Button type="submit" className="w-[10rem]">
          Save
        </Button>
      </div>
    </form>
  );
}

function InboxEntries() {
  function handleDragEnd(event: DragEndEvent) {
    if (!event.over || typeof event.active.id == "number") return;
    if (event.over.id == "trash") return TrashBoxHandleEntry(event.active.id);
  }

  return (
    <div className="space-y-6 pt-4">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {/** Faire comme si c'etait des boutons carres */}
          <Box id="actions">Actions</Box>
          <Box id="events">Events</Box>
          <Box id="delegated">Delegated</Box>
          <TrashBox />
        </div>
        <EntriesList />
      </DndContext>
    </div>
  );
}

export default function InboxPage() {
  return (
    <div className="container max-w-[48rem] space-y-20 pt-10">
      <Tabs defaultValue="inbox">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="entries" className="gap-2">
            Entries
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <InboxTextarea />
        </TabsContent>

        <TabsContent value="entries">
          <InboxEntries />
        </TabsContent>
      </Tabs>
    </div>
  );
}
