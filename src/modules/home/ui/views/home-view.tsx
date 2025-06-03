"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div>
      {session?.user.name}
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.refresh() },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
