import Link from 'next/link';
import { Facebook, Twitter, Instagram, ToyBrick } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ToyBrick className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ToyVerse</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your universe of fun and imagination.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/profile" className="text-sm hover:text-primary transition-colors">My Profile</Link></li>
              <li><Link href="/my-toys" className="text-sm hover:text-primary transition-colors">My Toys</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ToyVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
