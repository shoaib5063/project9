"use client"
import { ToyBrick, Car, Puzzle, Rocket, TestTube, Bear } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const categories = [
  { name: 'Building Blocks', icon: ToyBrick },
  { name: 'Remote Control', icon: Car },
  { name: 'Puzzles', icon: Puzzle },
  { name: 'Educational', icon: TestTube },
  { name: 'Action Figures', icon: Rocket },
  { name: 'Stuffed Animals', icon: Bear },
];

const testimonials = [
  {
    name: 'Sarah L.',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    testimonial: "ToyVerse has an amazing selection! I found the perfect birthday gift for my son, and it arrived so quickly. Highly recommended!",
    role: 'Happy Parent'
  },
  {
    name: 'Mike D.',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    testimonial: "As a collector, I'm always on the lookout for rare finds. ToyVerse's collection is impressive. I've found several gems for my collection here.",
    role: 'Toy Collector'
  },
  {
    name: 'Emily R.',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    testimonial: "The quality of the toys is fantastic, and the customer service is top-notch. My kids are always excited when a package from ToyVerse arrives.",
    role: 'Satisfied Customer'
  }
];

export default function ExtraSections() {
  return (
    <>
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect toy from our wide range of categories.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col items-center p-4 rounded-lg bg-background text-center transition-all duration-300 hover:bg-primary/10 hover:-translate-y-1 cursor-pointer">
                <category.icon className="h-10 w-10 mb-3 text-primary" />
                <h3 className="text-sm font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're loved by parents and kids alike!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
                </CardContent>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
