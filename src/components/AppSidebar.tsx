import { Truck, Package, Map, MessageSquare, Plus, LayoutDashboard, Search, User, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Valdymo skydas", url: "/", icon: LayoutDashboard },
  { title: "Kroviniai", url: "/kroviniai", icon: Package },
  { title: "Įkelti krovinį", url: "/naujas-krovinys", icon: Plus },
  { title: "Transportas", url: "/transportas", icon: Truck },
  { title: "Žemėlapis", url: "/zemelapis", icon: Map },
  { title: "Žinutės", url: "/zinutes", icon: MessageSquare },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
            <Truck className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-sidebar-accent-foreground">CargoFlow</h1>
            <p className="text-[11px] text-sidebar-muted">Krovinių birža</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[11px] uppercase tracking-wider mb-1">
            Navigacija
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <NavLink
          to="/profilis"
          className="flex items-center gap-3 px-2 rounded-lg hover:bg-sidebar-accent transition-colors py-2"
          activeClassName="bg-sidebar-accent"
        >
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-4 h-4 text-sidebar-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">Jonas P.</p>
            <p className="text-[11px] text-sidebar-muted truncate">UAB Logistika</p>
          </div>
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}
