import { redirect } from "next/navigation";

import { getSession } from "@/modules/auth/actions/get-session";

import { HomeView } from "@/modules/home/ui/views/home-view";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
};

export default Page;
