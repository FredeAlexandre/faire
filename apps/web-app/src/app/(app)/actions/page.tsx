import { ArrowUpDown, ListFilter } from "lucide-react";

import { Button } from "@faire/ui/button";
import { Input } from "@faire/ui/input";

export default function Actions() {
  return (
    <div className="container max-w-[48rem] pt-10">
      <div className="z-50 flex items-center justify-between bg-background">
        <h1 className="text-2xl font-semibold">Actions</h1>
        <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <ListFilter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Input placeholder="Search Actions" className="w-[16rem]" />
        </div>
      </div>
      <div></div>
    </div>
  );
}
