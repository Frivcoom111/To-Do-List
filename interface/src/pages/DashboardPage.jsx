import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";


function DashboardPage() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 p-6">
                    <Outlet /> {/* Aqui renderizam as rotas filhas */}
                </main>
            </div>
        </SidebarProvider>
    )
}

export default DashboardPage;