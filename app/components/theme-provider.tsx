"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// A linha abaixo foi corrigida.
// Os tipos são importados diretamente de "next-themes".
import { type ThemeProviderProps } from "next-themes"; 

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}