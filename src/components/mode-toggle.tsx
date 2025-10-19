import { Moon, Sun, Zap, Flame } from "lucide-react" //icons
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/lib/useTheme"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {/* Light theme icon */}
          <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "light" || theme === "system"
              ? "scale-100 rotate-0" 
              : "scale-0 -rotate-90"
          }`} />
          
          {/* Dark theme icon */}
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "dark" 
              ? "scale-100 rotate-0" 
              : "scale-0 rotate-90"
          }`} />
          
          {/* Cyberpunk theme icon */}
          <Zap className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "cyberpunk" 
              ? "scale-100 rotate-0" 
              : "scale-0 rotate-90"
          }`} />
          
          {/* Amber themes icon */}
          <Flame className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
            theme === "amber" || theme === "amethyst" 
              ? "scale-100 rotate-0" 
              : "scale-0 rotate-90"
          }`} />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
          Cyberpunk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("amber")}>
          Amber
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("amethyst")}>
          Amethyst
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}