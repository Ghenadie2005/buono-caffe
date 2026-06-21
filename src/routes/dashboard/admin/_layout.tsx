import { useEffect, useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase/client";

const SEED_LOCATIONS = [
  {
    name: "Premium Food",
    address: "123 Orhei Street",
    city: "Chisinau",
  },
  {
    name: "Poarta",
    address: "45 Stefan cel Mare Avenue",
    city: "Chisinau",
  },
  {
    name: "Le Cinq",
    address: "7 Piata Marii Adunari Nationale",
    city: "Chisinau",
  },
];

type LocationItem = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
};

export const Route = createFileRoute("/dashboard/admin/_layout")({
  component: AdminLandingPage,
});

function AdminLandingPage() {
  const { profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!profile) return;
    fetchLocations();
  }, [loading, profile]);

  async function fetchLocations() {
    setLoadingLocations(true);
    const { data, error } = await supabase
      .from("locations")
      .select("id,name,address,city")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Unable to load locations.");
      setLocations([]);
      setLoadingLocations(false);
      return;
    }

    if (!data || data.length === 0) {
      await seedLocations();
      return;
    }

    setLocations(data);
    setLoadingLocations(false);
  }

  async function seedLocations() {
    const { error } = await supabase.from("locations").insert(SEED_LOCATIONS);
    if (error) {
      toast.error("Unable to seed default locations.");
      setLocations([]);
      setLoadingLocations(false);
      return;
    }

    await fetchLocations();
  }

  async function handleCreateLocation(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedName = newName.trim();
    const trimmedCity = newCity.trim();
    const trimmedAddress = newAddress.trim();

    if (!trimmedName || !trimmedCity) {
      toast.error("Location name and city are required.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("locations").insert({
      name: trimmedName,
      address: trimmedAddress,
      city: trimmedCity,
    });

    if (error) {
      toast.error("Unable to add location.");
      setIsSubmitting(false);
      return;
    }

    setNewName("");
    setNewAddress("");
    setNewCity("");
    setModalOpen(false);
    await fetchLocations();
    toast.success("Location added.");
    setIsSubmitting(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/", replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-foreground px-4">
        <div className="rounded-3xl border border-border bg-card px-6 py-8 text-center shadow-xl">
          <p className="text-sm text-muted-foreground">Loading admin dashboard…</p>
        </div>
      </div>
    );
  }

  if (!profile || profile.role !== "super_admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-2xl font-display italic tracking-tight text-foreground">Buono Caffè</span>
          </div>

          <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
            <span className="font-medium text-foreground/90">{profile.full_name ?? "Super Admin"}</span>
            <span className="uppercase tracking-[0.3em] text-xs text-primary">{profile.role.replace("_", " ")}</span>
          </div>

          <Button variant="outline" size="sm" onClick={handleSignOut} className="border-primary/50 text-primary">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/80">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-display font-semibold tracking-tight text-foreground sm:text-5xl">
            Select a Location
          </h1>
          <p className="mt-4 text-base leading-8 text-foreground/70">
            Choose a location to manage or view all locations at once.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard/admin/all" })}
            className="group rounded-3xl border border-primary/20 bg-card p-8 text-left shadow-xl transition-transform hover:-translate-y-1 hover:border-primary hover:bg-primary/5"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.35em] text-primary">All Locations</span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-foreground">Overview across all cafés</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              View a combined dashboard for every Buono Caffè location.
            </p>
          </button>

          {loadingLocations
            ? [1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="animate-pulse rounded-3xl border border-border bg-muted/40 p-8"
                >
                  <div className="h-6 w-32 rounded-full bg-muted-foreground/40" />
                  <div className="mt-6 h-5 w-24 rounded-full bg-muted-foreground/30" />
                  <div className="mt-3 h-4 w-20 rounded-full bg-muted-foreground/20" />
                </div>
              ))
            : locations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => navigate({ to: `/dashboard/admin/location/${location.id}` })}
                  className="group rounded-3xl border border-border bg-card p-8 text-left shadow-xl transition-transform hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-primary">Location</span>
                  <h2 className="mt-6 text-2xl font-semibold text-foreground">{location.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{location.city}</p>
                </button>
              ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:brightness-110">
            Add New Location
          </Button>
        </div>
      </main>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Add New Location</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter the name, address, and city for the new café.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleCreateLocation}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location-name">Location Name</Label>
                <Input
                  id="location-name"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Premium Food"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location-address">Address</Label>
                <Input
                  id="location-address"
                  value={newAddress}
                  onChange={(event) => setNewAddress(event.target.value)}
                  placeholder="123 Orhei Street"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location-city">City</Label>
                <Input
                  id="location-city"
                  value={newCity}
                  onChange={(event) => setNewCity(event.target.value)}
                  placeholder="Chisinau"
                  required
                />
              </div>
            </div>

            <DialogFooter className="justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Location"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
