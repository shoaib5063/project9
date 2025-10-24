import HeroSlider from '@/components/home/HeroSlider';
import PopularToys from '@/components/home/PopularToys';
import ExtraSections from '@/components/home/ExtraSections';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <PopularToys />
      <ExtraSections />
    </div>
  );
}
