import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Box } from 'lucide-react';

import type { Toy } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';

interface ToyCardProps {
  toy: Toy;
}

export default function ToyCard({ toy }: ToyCardProps) {
  const image = PlaceHolderImages.find(p => p.id === toy.pictureURL);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          {image && (
            <Image
              src={image.imageUrl}
              alt={toy.toyName}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{toy.subCategory}</Badge>
        <CardTitle className="text-xl font-bold leading-tight mb-2 h-14">
            {toy.toyName}
        </CardTitle>
        <div className="flex justify-between items-center text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{toy.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Box className="w-4 h-4" />
            <span>{toy.availableQuantity} left</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">${toy.price.toFixed(2)}</p>
        <Button asChild>
          <Link href={`/toys/${toy.toyId}`}>
            View More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
