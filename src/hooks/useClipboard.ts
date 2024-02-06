import { useRef, useState } from "react";

export const useClipboard = (text: string, timeout: number = 2000) => {
  const [copied, setCopied] = useState(false);

  const copiedTimeout = useRef<ReturnType<typeof setTimeout>>();

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      copiedTimeout.current = setTimeout(() => {
        setCopied(false);
      }, timeout);
    }
  };

  return { copyToClipboard, copied };
};
