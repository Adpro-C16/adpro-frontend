import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import PopupSidebar from "./PopupSidebar";
import Sidebar from "./Sidebar";
import { Button } from "../ui/button";
import { Lexend } from "next/font/google";
import { useAuth } from "@/context/AuthContext";

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
                    <div className="w-full flex justify-between">
                        <div></div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <Image
                                        src={user?.username ? `https://ui-avatars.com/api/?background=115c02&color=fff&name={${user?.username.replace(" ", "+")}}` : `https://ui-avatars.com/api/?background=115c02&color=fff&name=John+Doe`}
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    )
}