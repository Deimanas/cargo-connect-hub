import { useEffect, useState } from "react";
import { Users, Building2, Package, Truck, ShieldCheck, UserCog, Eye, FolderTree, BoxSelect, FileText, ToggleLeft, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  users: number;
  suspended: number;
  companies: number;
  pendingCompanies: number;
  cargo: number;
  activeCargo: number;
  inTransit: number;
  delivered: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    users: 0, suspended: 0, companies: 0, pendingCompanies: 0,
    cargo: 0, activeCargo: 0, inTransit: 0, delivered: 0,
  });
  const [topUsers, setTopUsers] = useState<{ name: string; count: number }[]>([]);
  const [topCompanies, setTopCompanies] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, companiesRes, cargoRes] = await Promise.all([
        supabase.from("profiles").select("id, is_suspended, first_name, last_name, user_id"),
        supabase.from("companies").select("id, name, status"),
        supabase.from("cargo").select("id, status, user_id, title"),
      ]);

      const profiles = profilesRes.data || [];
      const companies = companiesRes.data || [];
      const cargoList = cargoRes.data || [];

      setStats({
        users: profiles.length,
        suspended: profiles.filter((p) => p.is_suspended).length,
        companies: companies.length,
        pendingCompanies: companies.filter((c) => c.status === "pending").length,
        cargo: cargoList.length,
        activeCargo: cargoList.filter((c) => c.status === "active").length,
        inTransit: cargoList.filter((c) => c.status === "in_transit").length,
        delivered: cargoList.filter((c) => c.status === "delivered").length,
      });

      // Top users by cargo count
      const userCargoCounts: Record<string, { name: string; count: number }> = {};
      cargoList.forEach((c) => {
        const profile = profiles.find((p) => p.user_id === c.user_id);
        const name = profile
          ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Nežinomas"
          : "Nežinomas";
        if (!userCargoCounts[c.user_id]) {
          userCargoCounts[c.user_id] = { name, count: 0 };
        }
        userCargoCounts[c.user_id].count++;
      });
      setTopUsers(
        Object.values(userCargoCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      );

      // Top companies placeholder (by count)
      setTopCompanies(
        companies
          .map((c) => ({ name: c.name, count: cargoList.filter((cr) => cr.user_id === c.id).length }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      );
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Vartotojai", value: String(stats.users), sub: `${stats.suspended} sustabdyti`, icon: Users, color: "text-blue-400" },
    { label: "Įmonės", value: String(stats.companies), sub: `${stats.pendingCompanies} laukia`, icon: Building2, color: "text-indigo-400" },
    { label: "Kroviniai", value: String(stats.cargo), sub: `${stats.activeCargo} aktyvūs`, icon: Package, color: "text-accent" },
    { label: "Vežami šiuo metu", value: String(stats.inTransit), sub: `${stats.delivered} pristatyta`, icon: Truck, color: "text-emerald-400" },
  ];

  const adminActions = [
    { title: "Valdyti vartotojus", desc: `${stats.users} registruoti`, icon: UserCog, bg: "bg-blue-500/10", iconColor: "text-blue-500", path: "/admin/vartotojai" },
    { title: "Tikrinti įmones", desc: `${stats.pendingCompanies} laukia patvirtinimo`, icon: ShieldCheck, bg: "bg-emerald-500/10", iconColor: "text-emerald-500", path: "/admin/imones" },
    { title: "Visi kroviniai", desc: `${stats.cargo} kroviniai platformoje`, icon: Package, bg: "bg-accent/10", iconColor: "text-accent", path: "/admin/kroviniai" },
    { title: "Krovinio rūšys", desc: "Pridėti ar ištrinti sąrašo reikšmes", icon: FolderTree, bg: "bg-rose-500/10", iconColor: "text-rose-500" },
    { title: "Transporto tipai", desc: "Valdyti transporto priemonių katalogą", icon: BoxSelect, bg: "bg-violet-500/10", iconColor: "text-violet-500" },
    { title: "Reportai", desc: "Peržiūrėti vartotojų pranešimus", icon: FileText, bg: "bg-red-500/10", iconColor: "text-red-500" },
    { title: "Moduliai", desc: "Įjungti / išjungti funkcijas", icon: ToggleLeft, bg: "bg-teal-500/10", iconColor: "text-teal-500" },
    { title: "Dokumentai", desc: "Redaguoti taisykles ir privatumo politiką", icon: ScrollText, bg: "bg-amber-500/10", iconColor: "text-amber-500" },
    { title: "Žiūrėti kaip vartotojas", desc: "Peržiūrėti krovinių rinką", icon: Eye, bg: "bg-sky-500/10", iconColor: "text-sky-500", path: "/kroviniai" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Administravimas</h1>
        <p className="text-muted-foreground text-sm mt-1">Platformos valdymo skydelis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="card-hover">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top įkėlę vartotojai</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">Dar nėra duomenų</p>
            ) : (
              topUsers.map((u) => (
                <div key={u.name} className="flex items-center justify-between py-1.5">
                  <span className="text-sm">{u.name}</span>
                  <span className="text-sm font-semibold text-accent">{u.count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top įmonės</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCompanies.length === 0 ? (
              <p className="text-sm text-muted-foreground">Dar nėra duomenų</p>
            ) : (
              topCompanies.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-1.5">
                  <span className="text-sm">{c.name}</span>
                  <span className="text-sm font-semibold text-accent">{c.count}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Admin action tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminActions.map((a) => (
          <Card
            key={a.title}
            className="card-hover cursor-pointer group"
            onClick={() => a.path && navigate(a.path)}
          >
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
