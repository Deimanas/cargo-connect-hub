import { useState } from "react";
import { mockCargos } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowRight, Clock, MapPin, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-success/10 text-success",
    reserved: "bg-warning/10 text-warning",
    completed: "bg-muted text-muted-foreground",
  };
  const labels = { active: "Aktyvus", reserved: "Rezervuotas", completed: "Baigtas" };
  return (
    <span className={`status-badge ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}

const CargoList = () => {
  const [search, setSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  const filtered = mockCargos.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.from.toLowerCase().includes(search.toLowerCase()) ||
      c.to.toLowerCase().includes(search.toLowerCase());
    const matchVehicle = vehicleFilter === "all" || c.vehicleType === vehicleFilter;
    return matchSearch && matchVehicle;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kroviniai</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} krovinių rasta</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => window.location.href = "/naujas-krovinys"}>
          <Package className="w-4 h-4 mr-2" /> Naujas krovinys
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ieškoti pagal pavadinimą, miestą..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Transporto tipas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Visi tipai</SelectItem>
                <SelectItem value="Tentinis">Tentinis</SelectItem>
                <SelectItem value="Refrižeratorius">Refrižeratorius</SelectItem>
                <SelectItem value="Furgoninis">Furgoninis</SelectItem>
                <SelectItem value="Platforma">Platforma</SelectItem>
                <SelectItem value="Cisterna">Cisterna</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cargo cards */}
      <div className="space-y-3">
        {filtered.map((cargo) => (
          <Card key={cargo.id} className="card-hover cursor-pointer">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Route */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{cargo.title}</h3>
                    <StatusBadge status={cargo.status} />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="font-medium">{cargo.from}</span>
                      <span className="text-muted-foreground text-xs">{cargo.fromCountry}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium">{cargo.to}</span>
                      <span className="text-muted-foreground text-xs">{cargo.toCountry}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">({cargo.distance} km)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{cargo.company}</p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Svoris</p>
                    <p className="font-semibold font-mono">{cargo.weight} t</p>
                  </div>
                  {cargo.volume && (
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Tūris</p>
                      <p className="font-semibold font-mono">{cargo.volume} m³</p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Tipas</p>
                    <p className="font-medium text-xs">{cargo.vehicleType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Pakrovimas</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <p className="font-medium text-xs">{cargo.loadDate}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Kaina</p>
                    <p className="font-bold text-accent font-mono">{cargo.price ? `€${cargo.price}` : "Derybos"}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Siūlyti transportą
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CargoList;
