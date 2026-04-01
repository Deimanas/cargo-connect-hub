import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Company {
  id: string;
  name: string;
  code: string | null;
  vat_code: string | null;
  city: string | null;
  status: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Laukia", color: "bg-amber-500/10 text-amber-500", icon: Clock },
  approved: { label: "Patvirtinta", color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle },
  rejected: { label: "Atmesta", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Klaida gaunant įmones");
    } else {
      setCompanies(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("companies")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Klaida keičiant statusą");
    } else {
      toast.success(`Įmonė ${status === "approved" ? "patvirtinta" : "atmesta"}`);
      fetchCompanies();
    }
  };

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.code || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Įmonių valdymas</h1>
          <p className="text-muted-foreground text-sm">Patvirtinkite ir valdykite registruotas įmones</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ieškoti įmonių..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{companies.length} įmonės</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pavadinimas</TableHead>
                <TableHead>Kodas</TableHead>
                <TableHead>Miestas</TableHead>
                <TableHead>Statusas</TableHead>
                <TableHead>Registracija</TableHead>
                <TableHead className="text-right">Veiksmai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Kraunama...</TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Įmonių nerasta</TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => {
                  const sc = statusConfig[c.status] || statusConfig.pending;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground">{c.code || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{c.city || "—"}</TableCell>
                      <TableCell>
                        <Badge className={`${sc.color} text-xs`}>{sc.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(c.created_at).toLocaleDateString("lt-LT")}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        {c.status !== "approved" && (
                          <Button variant="ghost" size="sm" className="text-emerald-500" onClick={() => updateStatus(c.id, "approved")}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Patvirtinti
                          </Button>
                        )}
                        {c.status !== "rejected" && (
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updateStatus(c.id, "rejected")}>
                            <XCircle className="w-4 h-4 mr-1" /> Atmesti
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
