"use client";

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { ResetPasswordSchema, type ResetPasswordData } from '@/lib/auth-types';
import { useToast } from '@/hooks/use-toast';
import { MailCheck } from 'lucide-react';

function ForgotPasswordContent() {
    const { resetPassword } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get('email');
  
    const form = useForm<ResetPasswordData>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
        email: emailFromQuery || '',
      },
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = form;
  
    const onSubmit = async (data: ResetPasswordData) => {
      setIsLoading(true);
      const result = await resetPassword(data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    };

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <MailCheck className="mx-auto h-12 w-12 text-green-500" />
                    <CardTitle className="text-2xl mt-4">Check Your Email</CardTitle>
                    <CardDescription>We&apos;ve sent a password reset link to your email address.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">Open Gmail</a>
                    </Button>
                </CardContent>
                <CardFooter className="text-sm justify-center">
                    <Link href="/login" className="text-primary hover:underline">
                        Back to Sign In
                    </Link>
                </CardFooter>
            </Card>
        );
    }
  
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription>No worries, we&apos;ll send you reset instructions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm justify-center">
          <Link href="/login" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    );
}

export default function ForgotPasswordPage() {
    return (
      <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordContent />
        </Suspense>
      </div>
    );
  }
