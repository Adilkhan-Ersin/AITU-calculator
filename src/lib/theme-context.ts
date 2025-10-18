import { createContext } from "react"

export type Theme = "dark" | "light" | "system" | "cyberpunk" | "amber" | "amethyst"

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// The initial state for the context
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

// Create and export the context from this file
export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)