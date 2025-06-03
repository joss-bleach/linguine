import { redirect } from "next/navigation";

import { getSession } from "@/modules/auth/actions/get-session";

import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

const Page = async () => {
  const session = await getSession();

  if (!!session) {
    redirect("/");
  }

  return <SignUpView />;
};

export default Page;
