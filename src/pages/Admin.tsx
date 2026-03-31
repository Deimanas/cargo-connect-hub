import { Users, Building2, Package, Truck, ShieldCheck, UserCog, Eye, FolderTree, BoxSelect, FileText, ToggleLeft, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Vartotojai", value: "33", sub: "1 sustabdyti", icon: Users, color: "text-blue-400" },
  { label: "Įmonės", value: "28", sub: "0 laukia", icon: Building2, color: "text-indigo-400" },
  { label: "Kroviniai", value: "24", sub: "12 aktyvūs", icon: Package, color: "text-accent" },
  { label: "Vežami šiuo metu", value: "0", sub: "0 pristatyta", icon: Truck, color: "text-emerald-400" },
];

const topUsers = [
  { name: "Deimanas Sutkevičius", count: 12 },
  { name: "Jonas Jonaitis", count: 8 },
  { name: "Petras Petraitis", count: 5 },
];

const topCompanies = [
  { name: "UAB \"VARLE\"", count: 12 },
  { name: "UAB \"LogiTrans\"", count: 9 },
  { name: "MB \"Greitas krovinys\"", count: 6 },
];

const adminActions = [
  { title: "Tikrinti įmones", desc: "0 laukia patvirtinimo", icon: ShieldCheck, bg: "bg-emerald-500/10", iconColor: "text-emerald-500" },
  { title: "Valdyti vartotojus", desc: "Sustabdyti, užblokuoti, peržiūrėti", icon: UserCog, bg: "bg-blue-500/10", iconColor: "text-blue-500" },
  { title: "Visi kroviniai", desc: "Stebėti ir valdyti platformą", icon: Package, bg: "bg-accent/10", iconColor: "text-accent" },
  { title: "Krovinio rūšys", desc: "Pridėti ar ištrinti sąrašo reikšmes", icon: FolderTree, bg: "bg-rose-500/10", iconColor: "text-rose-500" },
  { title: "Transporto tipai", desc: "Valdyti transporto priemonių katalogą", icon: BoxSelect, bg: "bg-violet-500/10", iconColor: "text-violet-500" },
  { title: "Reportai", desc: "Peržiūrėti vartotojų/įmonių pranešimus", icon: FileText, bg: "bg-red-500/10", iconColor: "text-red-500" },
  { title: "Moduliai", desc: "Įjungti / išjungti 2 ir 3 fazes", icon: ToggleLeft, bg: "bg-teal-500/10", iconColor: "text-teal-500" },
  { title: "Dokumentai", desc: "Redaguoti taisykles ir privatumo politiką", icon: ScrollText, bg: "bg-amber-500/10", iconColor: "text-amber-500" },
  { title: "Žiūrėti kaip vartotojas", desc: "Peržiūrėti krovinių rinką", icon: Eye, bg: "bg-sky-500/10", iconColor: "text-sky-500" },
];

export default function Admin() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Administravimas</h1>
        <p className="text-muted-foreground text-sm mt-1">Platformos valdymo skydelis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="card-hover">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg ${s.color} bg-current/10 flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active users + Top uploaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top įkėlę vartotojai</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topUsers.map((u) => (
              <div key={u.name} className="flex items-center justify-between py-1.5">
                <span className="text-sm">{u.name}</span>
                <span className="text-sm font-semibold text-accent">{u.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top įkėlusios įmonės</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCompanies.map((c) => (
              <div key={c.name} className="flex items-center justify-between py-1.5">
                <span className="text-sm">{c.name}</span>
                <span className="text-sm font-semibold text-accent">{c.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Admin action tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminActions.map((a) => (
          <Card key={a.title} className="card-hover cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <a.icon className={`w-6 h-6 ${a.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
