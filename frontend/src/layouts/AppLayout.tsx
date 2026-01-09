import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="font-jakarta flex h-screen relative w-screen max-w-screen">
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 transition-opacity md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`absolute md:static bg-white shadow-lg w-100! max-w-4/5 min-h-screen z-40 transform transition-all duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${isSidebarOpen ? "md:w-64!" : "md:w-20! overflow-hidden!"}`}>
                <Sidebar isSidebarOpen={isSidebarOpen} />
            </aside>

            {/* Content */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <header className="bg-white shadow-lg">
                    <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={setIsSidebarOpen} />
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#f9fafb] relative">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}