import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const SocialAuthButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" type="button" className="w-full">
        <FaGoogle />
      </Button>
      <Button variant="outline" type="button" className="w-full">
        <FaGithub />
      </Button>
    </div>
  );
};
