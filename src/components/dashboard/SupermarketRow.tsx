import { CheckCircleIcon, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { toRupiah } from "@/util/rupiahFormater";
import { useContext } from "react";
import { SupermarketContext } from "@/pages/admin/dashboard";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface SupermarketRowProps {
    id: number;
    name: string;
    balance: number;
}


export default function SupermarketRow({ id, name, balance }: SupermarketRowProps) {
    const { supermarkets, setSupermarkets } = useContext(SupermarketContext)
    const { authToken } = useAuth();
    return (
        <TableRow>
            <TableCell className="font-medium">
                {name}
            </TableCell>
            <TableCell>{toRupiah(balance)}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            await axios.delete(`https://heymart-management-6ndsbjpnka-ew.a.run.app/supermarkets/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            })
                            setSupermarkets(supermarkets.filter(s => s.id !== id))
                            toast("Supermarket deleted successfully", {
                                icon: <CheckCircleIcon size={18} color="green" />
                            })
                        }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}