import latte from "@/assets/product-latte.jpg";
import espresso from "@/assets/product-espresso.jpg";
import pourover from "@/assets/product-pourover.jpg";

const items = [
  { img: latte, name: "The Velvet Latte", desc: "Double ristretto, oat micro-foam, madagascar vanilla." },
  { img: espresso, name: "Roman Black", desc: "Our signature house blend. Notes of dark cacao and citrus." },
  { img: pourover, name: "Origins Pour-Over", desc: "Rotating single-origin beans, hand-brewed to order." },
];

export function Products() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display italic text-balance">Signature Selections</h2>
          <a href="#" className="text-sm font-mono text-primary uppercase tracking-widest border-b border-primary/30 pb-1 self-start sm:self-auto">
            View All Categories
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => (
            <div key={it.name} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl bg-background mb-6">
                <img
                  src={it.img}
                  alt={it.name}
                  width={640}
                  height={832}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors">{it.name}</h3>
              <p className="text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
