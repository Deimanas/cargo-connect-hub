import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Phone, Mail, MapPin, Star, Truck, Package, Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  company: string;
  companyCode: string;
  vatCode: string;
  address: string;
  phone: string;
  email: string;
}

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Jonas Petraitis",
    company: "UAB Logistika",
    companyCode: "304567890",
    vatCode: "LT100004567890",
    address: "Vilnius, Konstitucijos pr. 21",
    phone: "+370 600 12345",
    email: "jonas@logistika.lt",
  });
  const [draft, setDraft] = useState<ProfileData>(profile);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    toast.success("Profilis atnaujintas sėkmingai!");
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const updateDraft = (field: keyof ProfileData, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Profilis</h1>
        <p className="text-muted-foreground text-sm mt-1">Jūsų paskyros nustatymai</p>
      </div>

      {/* Profile header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center">
              <User className="w-9 h-9 text-accent-foreground" />
            </div>
            <div className="flex-1">
              {editing ? (
                <Input
                  value={draft.name}
                  onChange={e => updateDraft("name", e.target.value)}
                  className="text-xl font-bold h-auto py-1 px-2 mb-1"
                />
              ) : (
                <h2 className="text-xl font-bold">{profile.name}</h2>
              )}
              <p className="text-sm text-muted-foreground">{profile.company}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-xs text-muted-foreground">(127 atsiliepimai)</span>
              </div>
            </div>
            {!editing ? (
              <Button variant="outline" size="sm" onClick={() => { setDraft(profile); setEditing(true); }}>
                <Pencil className="w-4 h-4 mr-1" /> Redaguoti
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" /> Išsaugoti
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
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
            <ProfileField
              label="Įmonės pavadinimas"
              icon={Building2}
              value={editing ? draft.company : profile.company}
              editing={editing}
              onChange={v => updateDraft("company", v)}
            />
            <ProfileField
              label="Įmonės kodas"
              value={editing ? draft.companyCode : profile.companyCode}
              editing={editing}
              onChange={v => updateDraft("companyCode", v)}
            />
            <ProfileField
              label="PVM kodas"
              value={editing ? draft.vatCode : profile.vatCode}
              editing={editing}
              onChange={v => updateDraft("vatCode", v)}
            />
            <ProfileField
              label="Adresas"
              icon={MapPin}
              value={editing ? draft.address : profile.address}
              editing={editing}
              onChange={v => updateDraft("address", v)}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <ProfileField
              label="Telefonas"
              icon={Phone}
              value={editing ? draft.phone : profile.phone}
              editing={editing}
              onChange={v => updateDraft("phone", v)}
            />
            <ProfileField
              label="El. paštas"
              icon={Mail}
              value={editing ? draft.email : profile.email}
              editing={editing}
              onChange={v => updateDraft("email", v)}
            />
          </div>
        </CardContent>
      </Card>

      {editing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>Atšaukti</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" /> Išsaugoti pakeitimus
          </Button>
        </div>
      )}
    </div>
  );
};

function ProfileField({
  label,
  icon: Icon,
  value,
  editing,
  onChange,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {editing ? (
        <Input value={value} onChange={e => onChange(e.target.value)} className="h-9" />
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{value}</span>
        </div>
      )}
    </div>
  );
}

export default Profile;
