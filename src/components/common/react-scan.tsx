"use client";
// react-scan must be imported before react
import { scan } from "react-scan";
import { JSX, useEffect } from "react";

export function ReactScan(): JSX.Element {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      scan({
        enabled: true,
      });
    }
  }, []);

  return <></>
}