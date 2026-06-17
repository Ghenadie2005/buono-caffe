import aboutImage from "@/assets/about-roaster.jpg";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-display italic mb-8 text-balance">
            Heritage roasted into every bean
          </h2>
          <p className="text-foreground/70 leading-relaxed text-pretty mb-6">
            Founded in the heart of Rome, Buono Caffè began as a singular vision: to treat coffee not as a commodity, but as a sensory conversation. We source exclusively from micro-lots that honor the soil and the hands that tend it.
          </p>
          <p className="text-foreground/70 leading-relaxed text-pretty">
            Each batch is roasted in small quantities by master roasters who treat the curve as a composition — balancing acidity, body, and aroma into something distinctly Buono.
          </p>
          <div className="flex gap-12 mt-12 border-t border-border pt-8">
            <div>
              <div className="font-mono text-primary text-2xl">100%</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Arabica Origin</div>
            </div>
            <div>
              <div className="font-mono text-primary text-2xl">24h</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Roast-to-Cup</div>
            </div>
          </div>
        </div>
        <img
          src={aboutImage}
          alt="Roasting coffee beans in a copper drum"
          width={800}
          height={1024}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
}
