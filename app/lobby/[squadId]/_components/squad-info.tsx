import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocketIndicator } from "@/components/socket-indicator";

type SquadInfoProps = {
  name: string;
  description: string;
};

const SquadInfo = ({ name, description }: SquadInfoProps) => {
  const router = useRouter();

  return (
    <div className="p-2 my-2 rounded bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft size="18px" />
          </Button>
          <div className="text-xl font-bold">{name}</div>
          <SocketIndicator/>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => router.push("/dashboard")}
        >
          <Copy size="18px" />
        </Button>
      </div>
      <div className="mt-2 text-muted-foreground">{description}</div>
    </div>
  );
};

export default SquadInfo;
