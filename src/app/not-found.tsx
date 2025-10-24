import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NotFound() {
  const image = PlaceHolderImages.find(p => p.id === 'not-found');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] text-center px-4">
        {image && (
             <Image
             src={image.imageUrl}
             alt={image.description}
             width={400}
             height={320}
             className="mb-8 rounded-lg"
             data-ai-hint={image.imageHint}
           />
        )}
      <h1 className="text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  );
}
