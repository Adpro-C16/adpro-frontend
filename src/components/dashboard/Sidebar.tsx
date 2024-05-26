import { Home, Store, ShoppingCart, Users2, ShoppingBasket, Building2 } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Sidebar() {
    const router = useRouter();

    const isActive = (href: string) => router.pathname === href;
    const active = (href: string) => isActive(href) ? "bg-accent text-accent-foreground" : "text-muted-foreground";

    const { user } = useAuth();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
                <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image src="/icon-192.png" alt="Heymart" width={42} height={42} className="" />
                    <span className="sr-only">Heymart C15</span>
                </Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard"
                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/dashboard"))}
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
                {
                    user.role === "Admin" ?
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/admin/dashboard"
                                        className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/admin/dashboard"))}
                                    >
                                        <Building2 className="h-5 w-5" />
                                        <span className="sr-only">Admin Dashboard</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Admin Dashboard</TooltipContent>
                            </Tooltip>
                            <Tooltip></Tooltip>
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
                        </>
                        :
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/supermarket"
                                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/dashboard/supermarket"))}
                                >
                                    <Store className="h-5 w-5" />
                                    <span className="sr-only">Your Shop</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Your Shop</TooltipContent>
                        </Tooltip>
                }
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/store"
                            className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", active("/store"))}
                        >
                            <ShoppingBasket className="h-5 w-5" />
                            <span className="sr-only">Go to Store</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Go to Store</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}