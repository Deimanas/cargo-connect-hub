import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Mail, Lock, User, ArrowRight, Package } from "lucide-react";
import { toast } from "sonner";

export default function Auth() {
  const { session, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Sėkmingai prisijungta!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Registracija sėkminga! Patikrinkite el. paštą.");
      }
    } catch (error: any) {
      toast.error(error.message || "Įvyko klaida");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex gradient-hero">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">CargoFlow</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight">
            Krovinių birža<br />
            <span className="text-gradient-accent">naujos kartos</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md">
            Greitai raskite krovinius arba transportą. Valdykite logistiką vienoje platformoje.
          </p>
          <div className="flex gap-6 pt-4">
            {[
              { icon: Package, label: "156+ krovinių" },
              { icon: Truck, label: "83 vežėjai" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/70">
                <item.icon className="w-4 h-4 text-accent" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs relative z-10">© 2026 CargoFlow. Visos teisės saugomos.</p>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/3 rounded-full blur-2xl" />
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 mb-10 lg:hidden">
            <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">CargoFlow</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              {isLogin ? "Sveiki sugrįžę" : "Sukurkite paskyrą"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              {isLogin
                ? "Prisijunkite prie savo CargoFlow paskyros"
                : "Pradėkite naudotis krovinių birža"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">Vardas ir pavardė</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Jonas Jonaitis"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-11"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">El. paštas</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jonas@imone.lt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Slaptažodis</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gradient-accent text-white font-semibold border-0 hover:opacity-90 transition-opacity" disabled={submitting}>
              {submitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <>
                  {isLogin ? "Prisijungti" : "Registruotis"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Neturite paskyros? " : "Jau turite paskyrą? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent font-semibold hover:underline"
              >
                {isLogin ? "Registruokitės" : "Prisijunkite"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
