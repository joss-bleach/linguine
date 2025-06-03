"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { data: session } = authClient.useSession();

  const handleOnSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    });
  };

  return (
    <div>
      {session ? (
        <div>
          Logged in as {session.user.name}{" "}
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleOnSubmit}>Sign up</Button>
        </div>
      )}
    </div>
  );
};

export default Page;
