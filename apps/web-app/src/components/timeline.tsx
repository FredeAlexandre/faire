import * as React from "react";

import { cn } from "@faire/ui";

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {}

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={cn("relative flex flex-col", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        className={cn(
          "relative grid shrink-0 grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1fr)] grid-rows-[minmax(0,_1fr)_auto_minmax(0,_1fr)] items-center justify-items-center",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export interface TimelineItemStartProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineItemStart = React.forwardRef<
  HTMLDivElement,
  TimelineItemStartProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-4 m-1 self-center justify-self-end",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export interface TimelineItemMiddleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineItemMiddle = React.forwardRef<
  HTMLDivElement,
  TimelineItemMiddleProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("col-start-2 row-start-2", className)}
      ref={ref}
      {...props}
    />
  );
});

export interface TimelineItemEndProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TimelineItemEnd = React.forwardRef<
  HTMLDivElement,
  TimelineItemEndProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "col-start-3 col-end-4 row-start-1 row-end-4 m-1 self-center justify-self-start",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export interface TimelineTailStartProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export const TimelineTailStart = React.forwardRef<
  HTMLHRElement,
  TimelineTailStartProps
>(({ className, ...props }, ref) => {
  return (
    <hr
      className={cn(
        "col-start-2 row-start-1 h-full w-1 border-0 bg-muted",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export interface TimelineTailEndProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export const TimelineTailEnd = React.forwardRef<
  HTMLHRElement,
  TimelineTailEndProps
>(({ className, ...props }, ref) => {
  return (
    <hr
      className={cn(
        "row-end-none col-start-2 col-end-auto row-start-3 h-full w-1 border-0 bg-muted",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export function TimelineMiddleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}
