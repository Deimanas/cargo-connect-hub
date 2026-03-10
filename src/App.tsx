import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import CargoList from "./pages/CargoList";
import CargoDetailPage from "./pages/CargoDetailPage";
import NewCargo from "./pages/NewCargo";
import Transport from "./pages/Transport";
import MapView from "./pages/MapView";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kroviniai" element={<CargoList />} />
            <Route path="/naujas-krovinys" element={<NewCargo />} />
            <Route path="/transportas" element={<Transport />} />
            <Route path="/zemelapis" element={<MapView />} />
            <Route path="/zinutes" element={<Messages />} />
            <Route path="/profilis" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
