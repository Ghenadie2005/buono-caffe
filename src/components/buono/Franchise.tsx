export function Franchise() {
  return (
    <section id="franchise" className="py-32 md:py-40 text-center bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
          Partnership
        </span>
        <h2 className="text-4xl md:text-5xl font-display italic mb-8 text-balance">
          Legacy in every cup
        </h2>
        <p className="text-base md:text-lg text-foreground/60 mb-10 md:mb-12 leading-relaxed text-pretty">
          Bring the Buono Caffè experience to your city. We are seeking partners who value craft, community, and the slow art of the espresso.
        </p>
        <button className="h-14 px-10 md:px-12 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-xs">
          Learn More
        </button>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-bold italic opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
        Franchising
      </div>
    </section>
  );
}
