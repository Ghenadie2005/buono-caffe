import heroImage from "@/assets/hero-espresso.jpg";

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Steaming espresso in a dark cafe"
          width={1920}
          height={1280}
          className="w-full h-full object-cover animate-crema"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full animate-reveal">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
          Since 1954 · Roma
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display italic leading-[1.05] text-balance max-w-4xl">
          The ritual of the perfect <span className="text-primary">pour.</span>
        </h1>
        <p className="mt-8 text-base md:text-xl text-foreground/60 max-w-xl text-pretty leading-relaxed">
          Experience the slow, intentional art of Italian espresso. Every bean roasted to the precise second the crema demands.
        </p>
        <div className="mt-10 md:mt-12 flex flex-wrap gap-4 md:gap-6">
          <a href="#menu" className="h-14 px-8 md:px-10 inline-flex items-center bg-primary text-primary-foreground font-medium rounded-full hover:scale-105 transition-transform">
            Our Menu
          </a>
          <a href="#franchise" className="h-14 px-8 md:px-10 inline-flex items-center border border-foreground/20 hover:bg-foreground/5 font-medium rounded-full transition-colors">
            Franchise Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}
