import { useParams, useNavigate } from "react-router-dom";
import { mockCargos } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  Truck,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  Eye,
  HandCoins,
  Thermometer,
  AlertTriangle,
  FileText,
  CreditCard,
  Phone,
  Mail,
  User,
  Layers,
  Ruler,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-success/10 text-success border-success/20",
    reserved: "bg-warning/10 text-warning border-warning/20",
    completed: "bg-muted text-muted-foreground border-muted",
  };
  const labels = { active: "Aktyvus", reserved: "Rezervuotas", completed: "Baigtas" };
  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {labels[status as keyof typeof labels]}
    </Badge>
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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="mt-1" onClick={() => navigate("/kroviniai")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold">{cargo.title}</h1>
              <StatusBadge status={cargo.status} />
              {cargo.loadType && (
                <Badge variant="secondary">{cargo.loadType}</Badge>
              )}
              {cargo.adr && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" /> ADR
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span>{cargo.company}</span>
              {cargo.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Paskelbta: {cargo.createdAt}
                </span>
              )}
              {cargo.views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {cargo.views} peržiūrų
                </span>
              )}
              {cargo.offers !== undefined && (
                <span className="flex items-center gap-1">
                  <HandCoins className="w-3 h-3" /> {cargo.offers} pasiūlymai
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route */}
          <Card>
            <CardContent className="p-6">
              <SectionTitle icon={MapPin} title="Maršrutas" />
              <div className="mt-4 space-y-1">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-success ring-4 ring-success/20" />
                    <div className="w-0.5 flex-1 bg-muted-foreground/20 my-1" />
                    <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="font-semibold text-base">{cargo.from}, {cargo.fromCountry}</p>
                        <Badge variant="outline" className="text-xs">Pakrovimas</Badge>
                      </div>
                      {cargo.fromAddress && (
                        <p className="text-sm text-muted-foreground mt-0.5">{cargo.fromAddress}</p>
                      )}
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" /> {cargo.loadDate}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="font-semibold text-base">{cargo.to}, {cargo.toCountry}</p>
                        <Badge variant="outline" className="text-xs">Iškrovimas</Badge>
                      </div>
                      {cargo.toAddress && (
                        <p className="text-sm text-muted-foreground mt-0.5">{cargo.toAddress}</p>
                      )}
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" /> {cargo.unloadDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Atstumas: <span className="text-foreground font-bold">{cargo.distance} km</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cargo details */}
          <Card>
            <CardContent className="p-6">
              <SectionTitle icon={Package} title="Krovinio informacija" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <InfoItem label="Svoris" value={`${cargo.weight} t`} />
                {cargo.volume && <InfoItem label="Tūris" value={`${cargo.volume} m³`} />}
                {cargo.pallets && <InfoItem label="Paletės" value={`${cargo.pallets} vnt.`} />}
                <InfoItem label="Transporto tipas" value={cargo.vehicleType} />
                {cargo.cargoType && <InfoItem label="Krovinio tipas" value={cargo.cargoType} />}
                {cargo.loadType && <InfoItem label="Krovos tipas" value={cargo.loadType} />}
                {cargo.dimensions && (
                  <InfoItem
                    label="Matmenys (I×P×A)"
                    value={`${cargo.dimensions.length || "–"} × ${cargo.dimensions.width || "–"} × ${cargo.dimensions.height || "–"} m`}
                  />
                )}
                {cargo.temperatureRange && (
                  <InfoItem label="Temperatūra" value={cargo.temperatureRange} icon={Thermometer} />
                )}
                {cargo.adr && <InfoItem label="ADR" value={cargo.adr} icon={AlertTriangle} />}
              </div>

              {/* Boolean flags */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                <BoolFlag label="Galima krauti" value={cargo.stackable} />
                <BoolFlag label="Muitinė" value={cargo.customs} />
                <BoolFlag label="CMR" value={cargo.cmr} />
              </div>
            </CardContent>
          </Card>

          {/* Description & Notes */}
          {(cargo.description || cargo.notes) && (
            <Card>
              <CardContent className="p-6 space-y-4">
                {cargo.description && (
                  <div>
                    <SectionTitle icon={FileText} title="Aprašymas" />
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{cargo.description}</p>
                  </div>
                )}
                {cargo.notes && (
                  <div>
                    <SectionTitle icon={Info} title="Papildomos pastabos" />
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{cargo.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - price, payment, contact, actions */}
        <div className="space-y-6">
          {/* Price card */}
          <Card className="border-accent/30">
            <CardContent className="p-6">
              <SectionTitle icon={CreditCard} title="Kaina" />
              <div className="mt-4 text-center">
                <p className="text-3xl font-bold font-mono text-accent">
                  {cargo.price ? `€${cargo.price.toLocaleString()}` : "Derybinė"}
                </p>
                {cargo.pricePerKm && (
                  <p className="text-sm text-muted-foreground mt-1">
                    €{cargo.pricePerKm.toFixed(2)} / km
                  </p>
                )}
              </div>
              {(cargo.paymentTerm || cargo.paymentDays !== undefined) && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  {cargo.paymentTerm && (
                    <InfoItem label="Mokėjimo būdas" value={cargo.paymentTerm} />
                  )}
                  {cargo.paymentDays !== undefined && cargo.paymentDays > 0 && (
                    <InfoItem label="Mokėjimo terminas" value={`${cargo.paymentDays} d.`} />
                  )}
                  {cargo.paymentDays === 0 && (
                    <InfoItem label="Mokėjimo terminas" value="Iš anksto" />
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact card */}
          {(cargo.contactPerson || cargo.contactPhone || cargo.contactEmail) && (
            <Card>
              <CardContent className="p-6">
                <SectionTitle icon={User} title="Kontaktai" />
                <div className="mt-4 space-y-3">
                  {cargo.contactPerson && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{cargo.contactPerson}</span>
                    </div>
                  )}
                  {cargo.contactPhone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                      <a href={`tel:${cargo.contactPhone}`} className="text-accent hover:underline">
                        {cargo.contactPhone}
                      </a>
                    </div>
                  )}
                  {cargo.contactEmail && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <a href={`mailto:${cargo.contactEmail}`} className="text-accent hover:underline">
                        {cargo.contactEmail}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Truck className="w-4 h-4 mr-2" /> Siūlyti transportą
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/zinutes")}>
              <MessageSquare className="w-4 h-4 mr-2" /> Rašyti žinutę
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">{title}</h2>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold flex items-center gap-1">
        {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
        {value}
      </p>
    </div>
  );
}

function BoolFlag({ label, value }: { label: string; value?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      {value ? (
        <CheckCircle2 className="w-4 h-4 text-success" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground/50" />
      )}
      <span className={value ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

export default CargoDetailPage;
