"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToyBrick, LogOut, User as UserIcon, LogIn, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'My Profile' },
  { href: '/my-toys', label: 'My Toys' },
];

const defaultUserImage = PlaceHolderImages.find(img => img.id === 'default-user');

export default function Header() {
  const { user, loading, logoutUser } = useAuth();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const UserMenu = () => {
    if (loading) {
      return <Skeleton className="h-10 w-10 rounded-full" />;
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL || defaultUserImage?.imageUrl} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutUser}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild>
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Link>
      </Button>
    );
  };
  
  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={className}>
      {navLinks.map(({ href, label }) => (
        <Button
          key={href}
          variant={pathname === href ? 'secondary' : 'ghost'}
          asChild
          onClick={() => setIsSheetOpen(false)}
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <ToyBrick className="h-6 w-6 text-primary" />
            <span className="font-bold">ToyVerse</span>
          </Link>
        </div>
        
        <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <LayoutGrid className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsSheetOpen(false)}>
                        <ToyBrick className="h-6 w-6 text-primary" />
                        <span className="font-bold">ToyVerse</span>
                    </Link>
                    <NavLinks className="flex flex-col items-start gap-2" />
                </SheetContent>
            </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <NavLinks className="hidden md:flex items-center gap-2" />
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
