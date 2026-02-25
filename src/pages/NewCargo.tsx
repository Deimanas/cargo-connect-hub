import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NewCargo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Krovinys įkeltas!",
      description: "Jūsų krovinys sėkmingai paskelbtas biržoje.",
    });
    setTimeout(() => navigate("/kroviniai"), 1500);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold">Krovinys įkeltas!</h2>
          <p className="text-muted-foreground mt-1">Nukreipiame į krovinių sąrašą...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Naujas krovinys</h1>
        <p className="text-muted-foreground text-sm mt-1">Užpildykite informaciją apie krovinį</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="w-4 h-4 text-accent" /> Krovinio informacija
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Krovinio pavadinimas</Label>
              <Input id="title" placeholder="pvz. Statybinės medžiagos" required className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">Pakrovimo vieta</Label>
                <Input id="from" placeholder="Miestas, šalis" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="to">Iškrovimo vieta</Label>
                <Input id="to" placeholder="Miestas, šalis" required className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weight">Svoris (t)</Label>
                <Input id="weight" type="number" placeholder="0" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="volume">Tūris (m³)</Label>
                <Input id="volume" type="number" placeholder="0" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="price">Kaina (€)</Label>
                <Input id="price" type="number" placeholder="Derybos" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loadDate">Pakrovimo data</Label>
                <Input id="loadDate" type="date" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="unloadDate">Iškrovimo data</Label>
                <Input id="unloadDate" type="date" required className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="vehicleType">Transporto tipas</Label>
              <Select required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pasirinkite tipą" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tentinis">Tentinis</SelectItem>
                  <SelectItem value="refrizeratorius">Refrižeratorius</SelectItem>
                  <SelectItem value="furgoninis">Furgoninis</SelectItem>
                  <SelectItem value="platforma">Platforma</SelectItem>
                  <SelectItem value="cisterna">Cisterna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Papildoma informacija</Label>
              <Textarea id="description" placeholder="Aprašykite krovinį, specialius reikalavimus..." className="mt-1" rows={3} />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1">
                Paskelbti krovinį
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/kroviniai")}>
                Atšaukti
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default NewCargo;
