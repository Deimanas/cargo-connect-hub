import { mockCargos } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, ArrowRight } from "lucide-react";

const MapView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Krovinių žemėlapis</h1>
        <p className="text-muted-foreground text-sm mt-1">Vizualus krovinių maršrutų vaizdas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-14rem)]">
        {/* Map placeholder */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden border bg-card relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
            {/* SVG Map illustration */}
            <svg viewBox="0 0 800 500" className="w-full h-full opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Europe outline simplified */}
              <path d="M200 100 L300 80 L400 90 L500 70 L550 100 L600 80 L650 120 L680 180 L650 250 L600 300 L550 280 L500 320 L450 350 L400 330 L350 370 L300 350 L250 300 L200 280 L180 220 L190 160 Z" 
                stroke="hsl(215 60% 22%)" strokeWidth="2" fill="hsl(215 60% 22% / 0.05)" />
            </svg>
            
            {/* Cargo route markers */}
            {mockCargos.filter(c => c.status === "active").map((cargo, i) => (
              <div
                key={cargo.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${25 + (i * 8)}%`,
                }}
              >
                <div className="w-4 h-4 rounded-full bg-accent shadow-lg animate-pulse" />
                <div className="mt-1 px-2 py-0.5 rounded bg-card shadow-md text-[10px] font-medium whitespace-nowrap">
                  {cargo.from}
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-card/95 backdrop-blur-sm">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {mockCargos.filter(c => c.status === "active").length} aktyvių krovinių žemėlapyje
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Integruokite su Lovable Cloud, kad matytumėte tikrus žemėlapio duomenis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cargo sidebar list */}
        <div className="space-y-2 overflow-auto">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            Aktyvūs maršrutai
          </h3>
          {mockCargos.filter(c => c.status === "active").map((cargo) => (
            <Card key={cargo.id} className="card-hover cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Package className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{cargo.title}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <span>{cargo.from}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>{cargo.to}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-mono">{cargo.weight} t</span>
                      <span className="text-xs font-mono">{cargo.distance} km</span>
                      {cargo.price && (
                        <span className="text-xs font-bold text-accent font-mono">€{cargo.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
