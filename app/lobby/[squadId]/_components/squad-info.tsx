import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocketIndicator } from "@/components/socket-indicator";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

type SquadInfoProps = {
  roomId: string;
  name: string;
  description: string;
};

const SquadInfo = ({ name, description, roomId }: SquadInfoProps) => {
  const [copied, setCopied] = useState(false);
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
          <SocketIndicator />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CopyToClipboard
                text={`${process.env.NEXT_PUBLIC_SITE_URL}/invite/${roomId}`}
                onCopy={(text) => {
                  console.log(text);
                }}
              >
                <Button size="sm" variant="ghost">
                  <Copy size="18px" />
                </Button>
              </CopyToClipboard>
            </TooltipTrigger>
            <TooltipContent>
              Use to copy invite link to clipboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-2 text-muted-foreground">{description}</div>
    </div>
  );
};

export default SquadInfo;
