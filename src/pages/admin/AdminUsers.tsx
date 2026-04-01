import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserCog, Ban, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  is_suspended: boolean;
  created_at: string;
  company_id: string | null;
}

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Klaida gaunant vartotojus");
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const toggleSuspend = async (profile: Profile) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_suspended: !profile.is_suspended })
      .eq("id", profile.id);

    if (error) {
      toast.error("Klaida keičiant statusą");
    } else {
      toast.success(profile.is_suspended ? "Vartotojas aktyvuotas" : "Vartotojas sustabdytas");
      fetchProfiles();
    }
  };

  const filtered = profiles.filter((p) => {
    const name = `${p.first_name || ""} ${p.last_name || ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Vartotojų valdymas</h1>
          <p className="text-muted-foreground text-sm">Peržiūrėkite ir valdykite platformos vartotojus</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ieškoti vartotojų..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{profiles.length} vartotojai</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vardas</TableHead>
                <TableHead>Telefonas</TableHead>
                <TableHead>Statusas</TableHead>
                <TableHead>Registracija</TableHead>
                <TableHead className="text-right">Veiksmai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Kraunama...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Vartotojų nerasta
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      {p.first_name || p.last_name
                        ? `${p.first_name || ""} ${p.last_name || ""}`.trim()
                        : "Nenurodyta"}
                    </TableCell>
                    <TableCell>{p.phone || "—"}</TableCell>
                    <TableCell>
                      {p.is_suspended ? (
                        <Badge variant="destructive" className="text-xs">Sustabdytas</Badge>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-500 text-xs">Aktyvus</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(p.created_at).toLocaleDateString("lt-LT")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSuspend(p)}
                        className={p.is_suspended ? "text-emerald-500 hover:text-emerald-600" : "text-destructive hover:text-destructive"}
                      >
                        {p.is_suspended ? (
                          <><CheckCircle className="w-4 h-4 mr-1" /> Aktyvuoti</>
                        ) : (
                          <><Ban className="w-4 h-4 mr-1" /> Sustabdyti</>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
