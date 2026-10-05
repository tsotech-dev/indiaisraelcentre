"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SEORCE_SRC =
  "https://scripts.seorce.com/api?projectId=6ab3abe85e14fd0c731a6004";
const SEORCE_PROJECT_ID = "6ab3abe85e14fd0c731a6004";

export function SeorceScriptRouteHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Inject the script tag once on mount
  useEffect(() => {
    const existingScript = document.querySelector(
      "script#seorce-dynamic-script"
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = SEORCE_SRC;
    script.defer = true;
    script.setAttribute("data-uuid", SEORCE_PROJECT_ID);
    script.setAttribute("data-injected", "1");
    script.setAttribute("id", "seorce-dynamic-script");
    script.dataset.injectedAt = String(Date.now());
    document.head.appendChild(script);
  }, []);

  // Re-fire page-view tracking on every route change
  useEffect(() => {
    fetch(SEORCE_SRC)
      .then((response) => response.text())
      .then((scriptContent) => {
        const scriptElement = document.createElement("script");
        scriptElement.textContent = scriptContent;
        document.body.appendChild(scriptElement);
      })
      .catch((error) => {
        console.error("Failed to execute Seorce script:", error);
      });
  }, [pathname, searchParams]);

  return null;
}
