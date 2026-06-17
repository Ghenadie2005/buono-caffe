import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/buono/Navbar";
import { Hero } from "@/components/buono/Hero";
import { About } from "@/components/buono/About";
import { Products } from "@/components/buono/Products";
import { Franchise } from "@/components/buono/Franchise";
import { Footer } from "@/components/buono/Footer";
import { SignInModal } from "@/components/buono/SignInModal";
import { JoinUsModal } from "@/components/buono/JoinUsModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buono Caffè — The Ritual of the Perfect Pour" },
      { name: "description", content: "Premium Italian espresso since 1954. Discover Buono Caffè's signature roasts, café experience, and franchise opportunities." },
      { property: "og:title", content: "Buono Caffè — The Ritual of the Perfect Pour" },
      { property: "og:description", content: "Premium Italian espresso since 1954. Discover Buono Caffè's signature roasts, café experience, and franchise opportunities." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="font-body antialiased selection:bg-primary selection:text-primary-foreground">
      <Navbar onSignIn={() => setSignInOpen(true)} onJoin={() => setJoinOpen(true)} />
      <main>
        <Hero />
        <About />
        <Products />
        <Franchise />
      </main>
      <Footer />

      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
      <JoinUsModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}
