"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Box, User, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/useAuth';
import { toys } from '@/lib/toys';
import type { Toy } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type TryNowForm = {
  name: string;
  email: string;
};

export default function ToyDetailsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [toy, setToy] = useState<Toy | null>(null);

  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<TryNowForm>();

  useEffect(() => {
    const toyId = params.id;
    if (!loading && !user) {
      router.push(`/login?from=/toys/${toyId}`);
    }
    const foundToy = toys.find(t => t.toyId.toString() === toyId);
    setToy(foundToy || null);

    if (user) {
        reset({ name: user.displayName || '', email: user.email || '' });
    }

  }, [params.id, user, loading, router, reset]);

  const onTryNowSubmit = async (data: TryNowForm) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
        title: "Success!",
        description: `Thanks, ${data.name}! We've noted your interest.`,
    });
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-12 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!toy) {
    return <div className="text-center py-20">Toy not found.</div>;
  }
  
  const image = PlaceHolderImages.find(p => p.id === toy.pictureURL);

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={toy.toyName}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            )}
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
            <Badge variant="secondary" className="text-sm">{toy.subCategory}</Badge>
            <h1 className="text-4xl font-bold font-headline">{toy.toyName}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-lg">{toy.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-1">
                    <Box className="w-5 h-5" />
                    <span className="text-lg">{toy.availableQuantity} in stock</span>
                </div>
            </div>
          <p className="text-muted-foreground text-lg">{toy.description}</p>
          <p className="text-4xl font-bold text-primary">${toy.price.toFixed(2)}</p>
          
          <div className="text-sm text-muted-foreground pt-4">
            <p className="flex items-center gap-2"><User className="w-4 h-4"/>Sold by: <span className="font-semibold text-foreground">{toy.sellerName}</span></p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4"/>Contact: <span className="font-semibold text-foreground">{toy.sellerEmail}</span></p>
          </div>
        </div>
      </div>
      <div className="mt-16">
          <Card className="max-w-2xl mx-auto">
              <CardHeader>
                  <CardTitle>Want to Try It Now?</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below to express your interest.</p>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit(onTryNowSubmit)} className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" {...register("name")} />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" {...register("email")} />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Try Now"}
                      </Button>
                  </form>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
