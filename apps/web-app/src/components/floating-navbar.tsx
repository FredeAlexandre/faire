"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Inbox,
  ListTree,
  Moon,
  Settings,
  Sun,
  Users,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@faire/ui";
import { Button } from "@faire/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@faire/ui/tooltip";

export function NavbarModeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();

  if (resolvedTheme == "light") {
    return (
      <Button
        onClick={() => {
          setTheme("dark");
        }}
        className="h-12 w-12 rounded-full"
        variant="ghost"
      >
        <Moon />
      </Button>
    );
  }

  if (resolvedTheme == "dark") {
    return (
      <Button
        onClick={() => {
          setTheme("light");
        }}
        className="h-12 w-12 rounded-full"
        variant="ghost"
      >
        <Sun />
      </Button>
    );
  }
}

function NavbarButton({
  icon: Icon,
  label,
  to,
}: {
  icon: LucideIcon;
  label: string;
  to: string;
}) {
  const currentPath = usePathname();

  const active = currentPath == to;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              { active },
              "h-12 w-12 rounded-full [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow [&.active]:hover:bg-primary/90",
            )}
            variant="ghost"
            asChild
          >
            <Link href={to}>
              <Icon />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FloatingNavbar() {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border bg-background p-1 shadow-sm">
      <NavbarButton to="/inbox" icon={Inbox} label="Inbox" />
      <NavbarButton to="/execute" icon={Zap} label="Execute" />
      <NavbarButton to="/actions" icon={ListTree} label="Actions" />
      <NavbarButton to="/events" icon={Calendar} label="Events" />
      <NavbarButton to="/delegated" icon={Users} label="Delegated" />
      <NavbarButton to="/settings" icon={Settings} label="Settings" />
      <NavbarModeToggleButton />
    </div>
  );
}
