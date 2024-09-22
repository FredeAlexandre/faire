import { Tabs, TabsContent, TabsList, TabsTrigger } from "@faire/ui/tabs";

import { InboxEntries } from "./inbox-entries";
import { InboxTextarea } from "./inbox-textarea";

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
