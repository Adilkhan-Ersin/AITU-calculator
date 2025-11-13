'use client';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDownIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
// import { ThemeProviderContext } from '@/lib/theme-context';
// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  );
};
// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);
// User Menu Component
const UserMenu = ({
  userName = 'Mark Zuckerberg',
  userEmail = 'dih@example.com',
  userAvatar,
  onItemClick
}: {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onItemClick?: (item: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground">
        <Avatar className="h-7 w-7">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="text-xs">
            {userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <ChevronDownIcon className="h-3 w-3 ml-1" />
        <span className="sr-only">User menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{userName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {userEmail}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.('profile')}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.('settings')}>
        Grades
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onItemClick?.('billing')}>
        Leaderboard
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => onItemClick?.('logout')}>
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
// Types
export interface Navbar08NavItem {
  href?: string;
  label: string;
  active?: boolean;
}

export interface Navbar08Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar08NavItem[];
  // ADD THESE PROPS FOR SUBJECT SELECTION
  subjects?: string[];
  selectedSubject?: string;
  onSelectSubject?: (subject: string) => void;
  searchPlaceholder?: string;
  searchShortcut?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  onNavItemClick?: (href: string) => void;
  onSearchSubmit?: (query: string) => void;
  onNotificationItemClick?: (item: string) => void;
  onUserItemClick?: (item: string) => void;
}

export const Navbar08 = React.forwardRef<HTMLElement, Navbar08Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = 'https://youtu.be/dQw4w9WgXcQ?si=WbdTCDXYRFWdRgOx',
      userName = 'Tralaleo Tralala',
      userEmail = 'dih@example.com',
      userAvatar,
      // NEW SUBJECT PROPS
      subjects = [],
      selectedSubject = '',
      onSelectSubject,
      // onNavItemClick,
      onUserItemClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    // const theme = useContext(ThemeProviderContext)?.theme ?? 'light';

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full max-w-4xl mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8',
          className
        )}
        {...props}
      >
        <div className="container mx-auto max-w-screen-2xl">
          {/* Top section - Logo and theme toggle */}
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left side - Logo */}
            <div className="flex flex-1 items-center gap-2">
              {/* Mobile menu trigger */}
              {isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="group hover:bg-accent hover:text-accent-foreground"
                      variant="outline"
                      size="icon"
                    >
                      <HamburgerIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-80 p-2">
                    {/* <NavigationMenu className="max-w-none"> */}
                      <nav className="grid grid-cols-2 gap-2">
                        {subjects.map((subject) => (
                          <li key={subject} className='list-none mx-5'>
                          <button
                            onClick={() => onSelectSubject?.(subject)}
                            className={`text-sm font-semibold transition-colors ${
                              selectedSubject === subject 
                                ? 'text-accent' 
                                : 'text-accent-foreground'
                            }`}
                          >
                          {subject}
                          </button>
                          </li>
                        ))}
                        {/* {navigationLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <button
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                if (onNavItemClick && link.href) onNavItemClick(link.href);
                              }}
                              className={cn(
                                'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline',
                                link.active && 'bg-accent text-accent-foreground'
                              )}
                            >
                              {link.label}
                            </button>
                          </NavigationMenuItem>
                        ))} */}
                      </nav>
                    {/* </NavigationMenu> */}
                  </PopoverContent>
                </Popover>
              )}
              {/* Logo */}
              <div className="flex items-center">
                <button
                  onClick={logoHref ? () => window.open(logoHref, '_blank') : undefined}
                  className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">
                    {logo}
                  </div>
                  <span className="font-bold text-xl sm:inline-block hidden">Evalis</span>
                  {/* {ThemeProviderContext.useContext().theme === 'light' ?
                  <img src="/white.png" alt="logo" className="h-6 ms-2 hidden md:inline" /> : <img src="/dark.png" alt="logo" className="h-6 ms-2 hidden md:inline" />
                  } */}
                  <img src="/dark.png" alt="logo" className="h-6 ms-2 hidden md:inline" />
                  
                </button>
              </div>
            </div>

            {/* Right side - Theme toggle */}
            <div className="flex flex-1 items-center justify-end gap-2">
              {/* User menu */}
              <ModeToggle />
              <UserMenu 
                userName={userName}
                userEmail={userEmail}
                userAvatar={userAvatar}
                onItemClick={onUserItemClick}
              />
            </div>
          </div>

          {/* Bottom navigation - SUBJECT SELECTION (replaces old navbar) */}
          {!isMobile && (
            <div className="border-t py-2">
              {/* Navigation menu */}
              <nav className="flex justify-center items-center">
                <ul className="flex flex-wrap gap-2 sm:gap-x-4 justify-center">
                  {subjects.map((subject) => (
                    <li key={subject}>
                      <Button
                        size={"sm"}
                        onClick={() => onSelectSubject?.(subject)}
                        className={`hover:rounded-xl transition-all  md:text-sm text-xs font-semibold ${
                          selectedSubject === subject 
                            ? 'bg-accent-foreground border-0 text-secondary' 
                            : 'bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-secondary'
                        }`}
                      >
                        {subject}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
          {/* <div className="border-t py-4">
            <nav className="flex justify-center items-center">
              <ul className="flex flex-wrap gap-2 sm:gap-x-4 justify-center">
                {subjects.map((subject) => (
                  <li key={subject}>
                    <button
                      onClick={() => onSelectSubject?.(subject)}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-foreground md:text-sm text-xs font-semibold transition-colors ${
                        selectedSubject === subject 
                          ? 'bg-secondary text-primary' 
                          : 'bg-background text-accent-foreground hover:bg-card'
                      }`}
                    >
                      {subject}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div> */}
        </div>
      </header>
    );
  }
);

Navbar08.displayName = 'Navbar08';
export { Logo, HamburgerIcon };