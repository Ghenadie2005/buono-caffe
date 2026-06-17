// Buono Caffè — fixed top navigation
// TODO: replace text logo with brand SVG when available
export function Navbar({
  onSignIn,
  onJoin,
}: {
  onSignIn: () => void;
  onJoin: () => void;
}) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 md:gap-12 min-w-0">
          {/* Logo placeholder */}
          <a href="#" className="text-xl md:text-2xl font-display font-bold italic tracking-tight shrink-0">
            Buono Caffè
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-foreground/70">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#menu" className="hover:text-primary transition-colors">Menu</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#franchise" className="hover:text-primary transition-colors">Franchise</a>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onSignIn}
            className="text-sm font-medium px-3 sm:px-5 py-2 cursor-pointer hover:text-primary transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onJoin}
            className="text-sm font-medium px-4 sm:px-5 py-2.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:brightness-110 transition-all"
          >
            Join Us
          </button>
        </div>
      </div>
    </nav>
  );
}
