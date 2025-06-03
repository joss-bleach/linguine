"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  return (
    <div>
      <div>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    </div>
  );
};

export default Page;
