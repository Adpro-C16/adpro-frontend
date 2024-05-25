import { Home, LineChart, Package, Package2, ShoppingCart, Users2 } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const router = useRouter();

    const isActive = (href: string) => router.pathname === href;
    const active = (href: string) => isActive(href) ? "bg-accent text-accent-foreground" : "text-muted-foreground";

    const { user } = useAuth();
    
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={user.role === "Admin" ? "/admin/dashboard" : "/dashboard"}
                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/admin/dashboard"))}
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/supermarkets/create"
                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/admin/supermarkets/create"))}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Add Supermarkets</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Add Supermarkets</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/managers"
                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/admin/managers"))}
                        >
                            <Users2 className="h-5 w-5" />
                            <span className="sr-only">Managers</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Managers</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}