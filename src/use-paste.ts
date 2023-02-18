import { useEffect } from "react";

export const usePaste = () => {
  useEffect(() => {
    const onPasteListener = (e: any) => {
      e.preventDefault();

      const text = e?.clipboardData.getData("text/plain") as string;
      document.execCommand("insertText", false, text);
    };

    window.addEventListener("paste", onPasteListener);

    return () => window.removeEventListener("paste", onPasteListener);
  }, []);
};
