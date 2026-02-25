import { Cargo } from "@/data/mockData";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, MapPin, Package, Truck, MessageSquare } from "lucide-react";

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

interface CargoDetailProps {
  cargo: Cargo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CargoDetail({ cargo, open, onOpenChange }: CargoDetailProps) {
  if (!cargo) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-lg">{cargo.title}</SheetTitle>
            <StatusBadge status={cargo.status} />
          </div>
          <p className="text-sm text-muted-foreground">{cargo.company}</p>
        </SheetHeader>

        {/* Route */}
        <div className="rounded-xl bg-muted/50 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success shrink-0" />
            <div>
              <p className="font-semibold text-sm">{cargo.from}</p>
              <p className="text-xs text-muted-foreground">{cargo.fromCountry} · Pakrovimas: {cargo.loadDate}</p>
            </div>
          </div>
          <div className="ml-1.5 border-l-2 border-dashed border-muted-foreground/30 h-6" />
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-accent shrink-0" />
            <div>
              <p className="font-semibold text-sm">{cargo.to}</p>
              <p className="text-xs text-muted-foreground">{cargo.toCountry} · Iškrovimas: {cargo.unloadDate}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">{cargo.distance} km atstumas</p>
        </div>

        <Separator className="my-4" />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4">
          <DetailItem icon={Package} label="Svoris" value={`${cargo.weight} t`} />
          {cargo.volume && <DetailItem icon={Package} label="Tūris" value={`${cargo.volume} m³`} />}
          <DetailItem icon={Truck} label="Transporto tipas" value={cargo.vehicleType} />
          <DetailItem
            icon={Clock}
            label="Kaina"
            value={cargo.price ? `€${cargo.price}` : "Derybos"}
            highlight
          />
        </div>

        {cargo.description && (
          <>
            <Separator className="my-4" />
            <div>
              <p className="text-sm font-semibold mb-1">Aprašymas</p>
              <p className="text-sm text-muted-foreground">{cargo.description}</p>
            </div>
          </>
        )}

        <Separator className="my-4" />

        <div className="flex gap-3">
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
            <Truck className="w-4 h-4 mr-2" /> Siūlyti transportą
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/zinutes"}>
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm font-semibold font-mono ${highlight ? "text-accent" : ""}`}>{value}</p>
      </div>
    </div>
  );
}
