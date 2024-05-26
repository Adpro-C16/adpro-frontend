import PopupSidebar from "./PopupSidebar";
import Sidebar from "./Sidebar";
import { Lexend } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import UserSettings from "./UserSettings";

interface LayoutProps {
    children: React.ReactNode;
}

const lexend = Lexend({ subsets: ["latin"] });


export default function Layout({ children }: LayoutProps) {

    const { user, logout } = useAuth();

    return (
        <div style={lexend.style} className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <PopupSidebar />
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">Welcome {user.username}</h1>
                        </div>
                        <UserSettings />
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
            
        </div>
    )
}