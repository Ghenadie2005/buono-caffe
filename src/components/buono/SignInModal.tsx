import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth, type UserRole } from "@/lib/auth-context";

const PORTAL_ROLES: Record<"employee" | "admin", UserRole[]> = {
  employee: ["employee", "manager", "franchisee"],
  admin: ["super_admin"],
};

function PortalForm({
  portal,
  idPrefix,
  emailPlaceholder,
  onSuccess,
}: {
  portal: "employee" | "admin";
  idPrefix: string;
  emailPlaceholder: string;
  onSuccess: () => void;
}) {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await signIn(email, password, PORTAL_ROLES[portal]);
      toast.success("Signed in");
      onSuccess();
      if (portal === "admin") {
        navigate({ to: "/dashboard/admin", replace: true });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in failed";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-email`}>Email</Label>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-pass`}>Password</Label>
        <Input
          id={`${idPrefix}-pass`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage ? (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : null}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:brightness-110"
      >
        {isSubmitting ? "Signing in..." : portal === "admin" ? "Login as Admin" : "Login as Employee"}
      </Button>
    </form>
  );
}

export function SignInModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display italic">Sign In</DialogTitle>
          <DialogDescription className="text-muted-foreground">Select your portal to continue.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="employee" className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="employee">
            <PortalForm
              portal="employee"
              idPrefix="emp"
              emailPlaceholder="you@buonocaffe.com"
              onSuccess={() => onOpenChange(false)}
            />
          </TabsContent>

          <TabsContent value="admin">
            <PortalForm
              portal="admin"
              idPrefix="adm"
              emailPlaceholder="admin@buonocaffe.com"
              onSuccess={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
