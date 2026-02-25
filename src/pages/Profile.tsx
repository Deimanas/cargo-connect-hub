import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Phone, Mail, MapPin, Star, Truck, Package } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Profilis</h1>
        <p className="text-muted-foreground text-sm mt-1">Jūsų paskyros nustatymai</p>
      </div>

      {/* Profile header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center">
              <User className="w-9 h-9 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Jonas Petraitis</h2>
              <p className="text-sm text-muted-foreground">UAB Logistika</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-muted-foreground">(127 atsiliepimai)</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Redaguoti</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">342</p>
              <p className="text-xs text-muted-foreground">Kroviniai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">89</p>
              <p className="text-xs text-muted-foreground">Transportai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">4.8</p>
              <p className="text-xs text-muted-foreground">Reitingas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Įmonės informacija</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Įmonės pavadinimas</Label>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">UAB Logistika</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Įmonės kodas</Label>
              <span className="text-sm font-medium">304567890</span>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">PVM kodas</Label>
              <span className="text-sm font-medium">LT100004567890</span>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Adresas</Label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Vilnius, Konstitucijos pr. 21</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Telefonas</Label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">+370 600 12345</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">El. paštas</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">jonas@logistika.lt</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
