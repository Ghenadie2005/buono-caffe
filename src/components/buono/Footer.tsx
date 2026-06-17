import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20">
          <div className="col-span-2 md:col-span-1">
            {/* Logo placeholder */}
            <div className="text-2xl font-display font-bold italic mb-6">Buono Caffè</div>
            <p className="text-sm text-muted-foreground">Roma · Milano · London · New York</p>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">The Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Locations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-6">Business</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#franchise" className="hover:text-primary transition-colors">Franchising</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Wholesale</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-6">Connect</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="size-9 rounded-full border border-border grid place-items-center hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram className="size-4" />
              </a>
              <a href="#" aria-label="Twitter" className="size-9 rounded-full border border-border grid place-items-center hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter className="size-4" />
              </a>
              <a href="#" aria-label="Facebook" className="size-9 rounded-full border border-border grid place-items-center hover:bg-primary/10 hover:text-primary transition-colors">
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div>© 2026 Buono Caffè S.P.A.</div>
          <div>All Rights Reserved · Made in Italy</div>
        </div>
      </div>
    </footer>
  );
}
