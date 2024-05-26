import { CheckCheck, CheckCircleIcon, CircleX, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { toRupiah } from "@/util/rupiahFormater";
import { useContext, useState } from "react";
import { SupermarketContext } from "@/pages/admin/dashboard";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/input";

interface SupermarketRowProps {
    id: number;
    name: string;
    balance: number;
}


export default function SupermarketRow({ id, name, balance }: SupermarketRowProps) {
    const { supermarkets, setSupermarkets } = useContext(SupermarketContext)
    const { authToken } = useAuth();
    const [edit, setEdit] = useState(false)
    const [itemName, setItemName] = useState(name)

    return (
        <TableRow>
            <TableCell className="font-medium">
                {!edit ? itemName : (
                    <Input
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                    />
                )}
            </TableCell>
        </TableRow>
    )
}