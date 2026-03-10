import { useParams, useNavigate } from "react-router-dom";
import { mockCargos } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Clock, MapPin, Package, Truck, MessageSquare } from "lucide-react";

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

const CargoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cargo = mockCargos.find((c) => c.id === id);

  if (!cargo) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-muted-foreground">Krovinys nerastas</p>
        <Button variant="outline" onClick={() => navigate("/kroviniai")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Grįžti į sąrašą
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Back button + title */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/kroviniai")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{cargo.title}</h1>
          <StatusBadge status={cargo.status} />
        </div>
      </div>

      <p className="text-muted-foreground text-sm -mt-3 ml-12">{cargo.company}</p>

      {/* Route card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Maršrutas</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success shrink-0" />
              <div>
                <p className="font-semibold">{cargo.from}</p>
                <p className="text-xs text-muted-foreground">{cargo.fromCountry} · Pakrovimas: {cargo.loadDate}</p>
              </div>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-muted-foreground/30 mx-2" />
            <div className="text-xs text-muted-foreground">{cargo.distance} km</div>
            <div className="flex-1 border-t-2 border-dashed border-muted-foreground/30 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent shrink-0" />
              <div>
                <p className="font-semibold">{cargo.to}</p>
                <p className="text-xs text-muted-foreground">{cargo.toCountry} · Iškrovimas: {cargo.unloadDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailCard label="Svoris" value={`${cargo.weight} t`} icon={Package} />
        {cargo.volume && <DetailCard label="Tūris" value={`${cargo.volume} m³`} icon={Package} />}
        <DetailCard label="Transporto tipas" value={cargo.vehicleType} icon={Truck} />
        <DetailCard label="Kaina" value={cargo.price ? `€${cargo.price}` : "Derybos"} icon={Clock} highlight />
      </div>

      {/* Description */}
      {cargo.description && (
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Aprašymas</h2>
            <p className="text-sm text-foreground">{cargo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
          <Truck className="w-4 h-4 mr-2" /> Siūlyti transportą
        </Button>
        <Button variant="outline" onClick={() => navigate("/zinutes")}>
          <MessageSquare className="w-4 h-4 mr-2" /> Rašyti žinutę
        </Button>
      </div>
    </div>
  );
};

function DetailCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-start gap-3">
        <Icon className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`text-sm font-bold font-mono ${highlight ? "text-accent" : ""}`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CargoDetailPage;
