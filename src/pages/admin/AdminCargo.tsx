import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Cargo {
  id: string;
  title: string;
  pickup_city: string | null;
  delivery_city: string | null;
  weight: number | null;
  price: number | null;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Aktyvus", color: "bg-emerald-500/10 text-emerald-500" },
  in_transit: { label: "Vežamas", color: "bg-blue-500/10 text-blue-500" },
  delivered: { label: "Pristatytas", color: "bg-accent/10 text-accent" },
  cancelled: { label: "Atšauktas", color: "bg-destructive/10 text-destructive" },
};

export default function AdminCargo() {
  const [cargo, setCargo] = useState<Cargo[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCargo = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cargo")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Klaida gaunant krovinius");
    } else {
      setCargo(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCargo();
  }, []);

  const deleteCargo = async (id: string) => {
    const { error } = await supabase.from("cargo").delete().eq("id", id);
    if (error) {
      toast.error("Klaida trinant krovinį");
    } else {
      toast.success("Krovinys ištrintas");
      fetchCargo();
    }
  };

  const filtered = cargo.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.pickup_city || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.delivery_city || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Krovinių valdymas</h1>
          <p className="text-muted-foreground text-sm">Stebėkite ir valdykite visus platformos krovinius</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ieškoti krovinių..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary">{cargo.length} kroviniai</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pavadinimas</TableHead>
                <TableHead>Maršrutas</TableHead>
                <TableHead>Svoris</TableHead>
                <TableHead>Kaina</TableHead>
                <TableHead>Statusas</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Veiksmai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Kraunama...</TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Krovinių nerasta</TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => {
                  const sl = statusLabels[c.status] || statusLabels.active;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {c.pickup_city || "?"} → {c.delivery_city || "?"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {c.weight ? `${c.weight} t` : "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {c.price ? `€${c.price}` : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${sl.color} text-xs`}>{sl.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(c.created_at).toLocaleDateString("lt-LT")}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/kroviniai/${c.id}`)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteCargo(c.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
