import Link from "next/link";

import { Button } from "@faire/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-20">
      <h1 className="text-4xl font-bold">Faire</h1>
      <p>Modern way to apply the Getting Things Method</p>
      <Button asChild>
        <Link href="/login">Access app</Link>
      </Button>
    </div>
  );
}
