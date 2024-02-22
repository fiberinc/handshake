"use client";

import { BiCopy } from "react-icons/bi";
import { toast } from "sonner";

interface Props {
  content: string;
}

export function GitCloneCopyButton({ content }: Props) {
  return (
    <div
      className="hover:bg-background flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
      onClick={() => {
        void navigator.clipboard.writeText(content);
        toast("Copied to clipboard");
      }}
    >
      <BiCopy className="w-5 " />
    </div>
  );
}
