"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { UpdateProfileSchema, type UpdateProfileData } from '@/lib/auth-types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const defaultUserImage = PlaceHolderImages.find(img => img.id === 'default-user');

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: '',
      photoURL: '',
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?from=/profile');
    }
    if (user) {
      form.reset({
        name: user.displayName || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user, loading, router, form]);

  const onSubmit = async (data: UpdateProfileData) => {
    const result = await updateUserProfile(data);
    if (result.success) {
      toast({
        title: 'Profile Updated',
        description: 'Your information has been successfully updated.',
      });
    } else {
      toast({
        title: 'Update Failed',
        description: result.error,
        variant: 'destructive',
      });
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;


  if (loading || !user) {
    return (
      <div className="container mx-auto max-w-2xl py-12 px-4">
        <div className="space-y-8">
            <Skeleton className="h-12 w-1/2" />
            <div className="flex items-center gap-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">My Profile</CardTitle>
          <CardDescription>View and edit your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex items-center gap-6">
            <div className="relative h-24 w-24">
                <Image
                    src={user.photoURL || defaultUserImage?.imageUrl || ''}
                    alt={user.displayName || 'User'}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                />
            </div>

            <div>
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="photoURL">Photo URL</Label>
                    <Input id="photoURL" {...register('photoURL')} />
                    {errors.photoURL && <p className="text-sm text-destructive">{errors.photoURL.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
