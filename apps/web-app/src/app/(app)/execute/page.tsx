"use client";

import React from "react";
import { format, isAfter, isEqual, isPast, isSameDay } from "date-fns";
import { CalendarIcon, Circle } from "lucide-react";

import { cn } from "@faire/ui";
import { Button } from "@faire/ui/button";
import { Calendar } from "@faire/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@faire/ui/popover";

import {
  Timeline,
  TimelineItem,
  TimelineItemEnd,
  TimelineItemMiddle,
  TimelineTailEnd,
  TimelineTailStart,
} from "~/components/timeline";

type TimelineItemType = {
  id: number | string;
  start: Date;
  content: string;
};

const planning = (
  [
    { start: new Date("December 28, 2002 10:24:00"), content: "Birthday" },
    { start: new Date("December 28, 2002 11:24:00"), content: "Birthday" },
    { start: new Date("December 28, 2008 10:24:00"), content: "Birthday" },
    { start: new Date("December 28, 2024 10:24:00"), content: "22 Years old" },
    { start: new Date("December 28, 2025 10:24:00"), content: "22 Years old" },
  ] as Omit<TimelineItemType, "id">[]
)
  .map((v, i) => ({ ...v, id: i }))
  .sort((a, b) => {
    if (isEqual(a.start, b.start)) return 0;
    if (isAfter(a.start, b.start)) return 1;
    return -1;
  });

function renderTimelineItem(
  item: TimelineItemType,
  key: number,
  items: TimelineItemType[],
) {
  const isLastItem = key == items.length - 1;
  const isFirstItem = key == 0;
  const isSameDayAsPrevious = isFirstItem
    ? false
    : //@ts-expect-error TODO find a better way to access arrays and handle undefined values
      isSameDay(item.start, items[key - 1].start);
  const nextItem = isLastItem ? item : items[key + 1];
  const isLight = isPast(item.start);

  let timeline_date = null;

  if (!isSameDayAsPrevious) {
    const start_tail = isFirstItem ? null : (
      <TimelineTailStart className={cn({ "bg-primary": isLight })} />
    );
    const end_tail = (
      <TimelineTailEnd
        className={cn({
          "bg-primary": isLight,
          "rounded-t": isFirstItem,
        })}
      />
    );

    timeline_date = (
      <TimelineItem
        key={`${item.id}-date`}
        className="grid-cols-[0.5rem_1rem_minmax(0,_1fr)]"
      >
        {start_tail}
        <TimelineItemEnd
          className={cn("w-full pl-4 text-xs font-bold text-muted-foreground", {
            "pt-8": !isFirstItem,
          })}
        >
          {format(item.start, "PPP")}
        </TimelineItemEnd>
        {end_tail}
      </TimelineItem>
    );
  }

  const start_tail = (
    <TimelineTailStart className={cn({ "bg-primary": isLight })} />
  );
  const dot_tail = (
    <TimelineItemMiddle>
      {isLight ? (
        <Circle className="h-4 w-4 fill-primary text-transparent" />
      ) : (
        <Circle className="h-4 w-4 text-muted" />
      )}
    </TimelineItemMiddle>
  );
  const end_tail = isLastItem ? null : (
    //@ts-expect-error TODO find a better way to access arrays and handle undefined values
    <TimelineTailEnd className={cn({ "bg-primary": isPast(nextItem.start) })} />
  );

  return (
    <>
      {timeline_date}
      <TimelineItem
        key={item.id}
        className="grid-cols-[0.5rem_auto_minmax(0,_1fr)]"
      >
        {start_tail}
        {dot_tail}
        <TimelineItemEnd className="w-full">
          <div className="w-full rounded-lg border px-2 py-1">
            {item.content}
          </div>
        </TimelineItemEnd>
        {end_tail}
      </TimelineItem>
    </>
  );
}

export default function Execute() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="container max-w-[48rem] pt-10">
      <div className="z-50 flex items-center justify-between bg-background">
        <h1 className="text-2xl font-semibold">Execute</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[16rem] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(x) => (x ? setDate(x) : null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="pb-24 pt-10">
        <div>
          <Timeline>{planning.map(renderTimelineItem)}</Timeline>
        </div>
      </div>
    </div>
  );
}
