// @ts-nocheck

import { Toaster } from "react-hot-toast";
import { useLocalStorage, useMedia, useUpdateEffect } from "react-use";

export function OurToaster() {
  const isDarkMode = useIsDarkMode();

  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className:
          "min-w-[400px] text-md border-[1px] border-primary dark:text-white",
        duration: 4000,
        style: {
          boxShadow: "none",
          color: isDarkMode ? "#fff" : "#000",
          background: isDarkMode ? "#1a1a1a" : "#fafafa",
        },
      }}
    />
  );
}

export function useIsDarkMode(defaultValue?: boolean) {
  const isDarkOS = useMedia("(prefers-color-scheme: dark)");
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "usehooks-ts-dark-mode",
    defaultValue ?? isDarkOS ?? false,
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return isDarkMode ?? false;
}
