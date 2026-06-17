import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

          <TabsContent value="employee" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="emp-email">Email</Label>
              <Input id="emp-email" type="email" placeholder="you@buonocaffe.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emp-pass">Password</Label>
              <Input id="emp-pass" type="password" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:brightness-110">Login as Employee</Button>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="adm-email">Admin Email</Label>
              <Input id="adm-email" type="email" placeholder="admin@buonocaffe.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adm-pass">Password</Label>
              <Input id="adm-pass" type="password" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:brightness-110">Login as Admin</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
