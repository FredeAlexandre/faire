"use client";

import React from "react";
import {
  DndContext,
  pointerWithin,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Plus } from "lucide-react";

import { cn } from "@faire/ui";
import { Button } from "@faire/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@faire/ui/tabs";
import { Textarea } from "@faire/ui/textarea";

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
          "w-full cursor-grab space-y-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
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

function EntryFiles({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1">{children}</div>;
}

function EntryFile({ title }: { title: string }) {
  return (
    <Button variant="outline" size="sm">
      {title}
    </Button>
  );
}

function EntryContent({ children }: { children?: string }) {
  return <div>{children}</div>;
}

function FakeEntry({ id }: { id: string | number }) {
  return (
    <Entry id={id}>
      <EntryContent>Go walk the dog outside</EntryContent>
      <EntryFiles>
        <EntryFile title="id_parent.pdf" />
        <EntryFile title="id_parent.pdf" />
        <EntryFile title="id_parent.pdf" />
      </EntryFiles>
    </Entry>
  );
}

function Box({
  id,
  children,
}: {
  id: string | number;
  children?: React.ReactNode;
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
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <p className="text-muted-foreground">
                Here you can write everything you have in mind and want to
                collecte later. This can be notes, reminders, references,
                documents, tasks, etc... Write something you will be able to
                understand later
              </p>
            </div>
            <div className="space-y-1">
              <Textarea
                rows={10}
                placeholder="Create a placeholder here which change on each render with a predefine list of examples"
              />
              <div className="flex flex-wrap gap-1">
                <Button variant="outline">
                  Add file <Plus className="inline" size={16} />
                </Button>
              </div>
            </div>
            <Button className="w-full">Save</Button>
          </div>
        </TabsContent>

        <TabsContent value="entries">
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <p className="text-muted-foreground">
                Here is all the entries you created from the Inbox. You can drag
                to the right box "Action", "Event", "Reference" or "Delegated"
              </p>
            </div>
            <DndContext collisionDetection={pointerWithin}>
              <div className="grid grid-cols-4 gap-4">
                {/** Faire comme si c'etait des boutons carres */}
                <Box id="actions">
                  Actions
                  <Box id="projects">Projects</Box>
                </Box>
                <Box id="events">Events</Box>
                <Box id="references">References</Box>
                <Box id="delegated">Delegated</Box>
              </div>
              <div className="space-y-2">
                <FakeEntry id="0" />
                <FakeEntry id="1" />
                <FakeEntry id="2" />
                <FakeEntry id="3" />
                <FakeEntry id="4" />
              </div>
            </DndContext>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
