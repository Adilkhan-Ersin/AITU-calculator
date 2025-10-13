// src/hooks/useTheme.ts

import { useContext } from "react"
// ✅ Import the context from your new central context file
import { ThemeProviderContext } from "@/lib/theme-context" // Adjust path as needed

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}