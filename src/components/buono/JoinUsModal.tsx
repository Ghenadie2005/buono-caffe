import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function JoinUsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display italic">Join the club</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your account will be reviewed and activated by our team.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="join-name">Full Name</Label>
            <Input id="join-name" type="text" placeholder="Marco Rossi" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-email">Email</Label>
            <Input id="join-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-pass">Password</Label>
            <Input id="join-pass" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="join-type">Account Type</Label>
            <Select>
              <SelectTrigger id="join-type">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="franchisee">Franchisee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed italic pt-2">
            Note: Your account will be reviewed and activated by our team. You will receive an invitation via email once approved.
          </p>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:brightness-110">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
