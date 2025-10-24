import { toys } from '@/lib/toys';
import ToyCard from '../ToyCard';

export default function PopularToys() {
  const popularToys = toys.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
            Popular Toys
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our most loved toys that are flying off the shelves!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularToys.map((toy) => (
            <ToyCard key={toy.toyId} toy={toy} />
          ))}
        </div>
      </div>
    </section>
  );
}
