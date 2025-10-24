"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';
import Autoplay from "embla-carousel-autoplay";

const sliderImages = [
  { id: 'slider-1', title: 'Unleash Your Creativity', description: 'Discover endless possibilities with our collection of building blocks.', buttonText: 'Shop Blocks' },
  { id: 'slider-2', title: 'Experience the Thrill', description: 'High-speed remote control toys for action-packed adventures.', buttonText: 'Explore RC Toys' },
  { id: 'slider-3', title: 'Find a Cuddly Friend', description: 'Bring home a soft and lovable companion for your little ones.', buttonText: 'Browse Plushies' },
];

export default function HeroSlider() {
  const images = PlaceHolderImages.filter(p => sliderImages.some(s => s.id === p.id));

  return (
    <section className="w-full">
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {sliderImages.map((slide, index) => {
            const image = images.find(img => img.id === slide.id);
            return (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-none rounded-none">
                  <CardContent className="relative flex aspect-[2.4/1] items-center justify-center p-0">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover brightness-50"
                        data-ai-hint={image.imageHint}
                        priority={index === 0}
                      />
                    )}
                    <div className="relative z-10 text-center text-white p-4">
                      <h2 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                        {slide.description}
                      </p>
                      <Button asChild size="lg" className="mt-6 bg-accent hover:bg-accent/90">
                        <Link href="/">{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </section>
  );
}
