import { Package, Truck, TrendingUp, MapPin, ArrowRight, Clock, Euro } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCargos, mockTransportOffers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Aktyvūs kroviniai", value: "156", icon: Package, change: "+12%" },
  { label: "Laisvas transportas", value: "83", icon: Truck, change: "+5%" },
  { label: "Maršrutai šiandien", value: "42", icon: MapPin, change: "+8%" },
  { label: "Vid. kaina/km", value: "€1.28", icon: Euro, change: "-2%" },
];

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

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Valdymo skydas</h1>
        <p className="text-muted-foreground text-sm mt-1">Krovinių biržos apžvalga</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-xs text-success mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stat.change} šią savaitę
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent cargos */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Naujausi kroviniai</CardTitle>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent" onClick={() => navigate("/kroviniai")}>
            Visi kroviniai <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Krovinys</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Maršrutas</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Svoris</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Kaina</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Data</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Būsena</th>
                </tr>
              </thead>
              <tbody>
                {mockCargos.slice(0, 5).map((cargo) => (
                  <tr key={cargo.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="p-3">
                      <p className="font-medium">{cargo.title}</p>
                      <p className="text-xs text-muted-foreground">{cargo.vehicleType}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-medium">{cargo.from}</span>
                        <span className="text-muted-foreground">{cargo.fromCountry}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />
                        <span className="font-medium">{cargo.to}</span>
                        <span className="text-muted-foreground">{cargo.toCountry}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{cargo.distance} km</p>
                    </td>
                    <td className="p-3 font-mono text-xs">{cargo.weight} t</td>
                    <td className="p-3 font-mono text-xs font-semibold">{cargo.price ? `€${cargo.price}` : "—"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {cargo.loadDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={cargo.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Transport offers */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Laisvas transportas</CardTitle>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent" onClick={() => navigate("/transportas")}>
            Visas transportas <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockTransportOffers.slice(0, 4).map((offer) => (
              <div key={offer.id} className="p-3 rounded-lg border bg-card hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{offer.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{offer.vehicleType} · {offer.capacity} t</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-warning">★</span>
                    <span className="font-medium">{offer.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs mt-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {offer.from} → {offer.to}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{offer.availableDate}</span>
                  {offer.pricePerKm && (
                    <span className="text-xs font-semibold font-mono">€{offer.pricePerKm}/km</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
