"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';

export default function MyToysPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/my-toys');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="space-y-8">
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-8 w-48 mt-4" />
                <Skeleton className="h-4 w-64 mt-2" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
        <header className="mb-8">
            <h1 className="text-4xl font-bold font-headline">My Toys</h1>
            <p className="text-muted-foreground mt-2">A collection of toys you've shown interest in.</p>
        </header>
        <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-card">
            <PackageSearch className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mt-4">Your Toy Box is Empty</h2>
            <p className="text-muted-foreground mt-2">
                When you express interest in a toy using the "Try Now" button, it will appear here.
            </p>
        </div>
    </div>
  );
}