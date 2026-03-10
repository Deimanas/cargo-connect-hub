import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockCargos } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ArrowRight, MapPin } from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const fromIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const toIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const routeColors = [
  "hsl(25, 95%, 53%)",
  "hsl(200, 80%, 50%)",
  "hsl(150, 70%, 40%)",
  "hsl(280, 60%, 55%)",
  "hsl(350, 80%, 50%)",
  "hsl(45, 90%, 50%)",
];

const activeCargos = mockCargos.filter(c => c.status === "active" && c.fromCoords && c.toCoords);

const MapView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Krovinių žemėlapis</h1>
        <p className="text-muted-foreground text-sm mt-1">Interaktyvus krovinių maršrutų vaizdas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-14rem)]">
        <div className="lg:col-span-2 rounded-xl overflow-hidden border bg-card relative">
          <MapContainer
            center={[55.5, 20.0]}
            zoom={5}
            className="w-full h-full z-0"
            style={{ minHeight: "400px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeCargos.map((cargo, i) => (
              <div key={cargo.id}>
                <Marker position={cargo.fromCoords as [number, number]} icon={fromIcon}>
                  <Popup>
                    <strong>{cargo.from}</strong><br />
                    Pakrovimas: {cargo.loadDate}<br />
                    {cargo.title}
                  </Popup>
                </Marker>
                <Marker position={cargo.toCoords as [number, number]} icon={toIcon}>
                  <Popup>
                    <strong>{cargo.to}</strong><br />
                    Iškrovimas: {cargo.unloadDate}<br />
                    {cargo.title}
                  </Popup>
                </Marker>
                <Polyline
                  positions={[cargo.fromCoords as [number, number], cargo.toCoords as [number, number]]}
                  pathOptions={{
                    color: routeColors[i % routeColors.length],
                    weight: 3,
                    dashArray: "8 4",
                    opacity: 0.8,
                  }}
                />
              </div>
            ))}
          </MapContainer>

          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <Card className="bg-card/95 backdrop-blur-sm">
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {activeCargos.length} aktyvių krovinių žemėlapyje ·{" "}
                  <span className="text-success">●</span> Pakrovimas ·{" "}
                  <span className="text-destructive">●</span> Iškrovimas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-2 overflow-auto">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            Aktyvūs maršrutai
          </h3>
          {activeCargos.map((cargo, i) => (
            <Card key={cargo.id} className="card-hover cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: routeColors[i % routeColors.length] + "20" }}
                  >
                    <Package className="w-4 h-4" style={{ color: routeColors[i % routeColors.length] }} />
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
                        <span className="text-xs font-bold font-mono" style={{ color: routeColors[i % routeColors.length] }}>
                          €{cargo.price}
                        </span>
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
