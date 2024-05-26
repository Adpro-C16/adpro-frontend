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
            <TableCell>{toRupiah(balance)}</TableCell>
            {edit && <>
                <TableCell>
                    <CheckCheck className="cursor-pointer" onClick={async () => {
                        toast("Supermarket updated successfully", {
                            icon: <CheckCheck size={18} color="green" />
                        })
                        setEdit(false);
                        await axios.put(`https://heymart-management-6ndsbjpnka-ew.a.run.app/supermarkets/${id}`, {
                            name: itemName
                        }, {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        })
                    }} size={18} color="green" />
                </TableCell>
                <TableCell>
                    <CircleX className="cursor-pointer" onClick={() => {
                        setItemName(name)
                        setEdit(false)
                        toast("Edit canceled", {
                            icon: <CheckCheck size={18} color="green" />
                        })
                    }} size={18} color="red" />
                </TableCell>
            </>}
            {!edit && <TableCell>
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
                        <DropdownMenuItem onClick={() => setEdit(true)}>Edit</DropdownMenuItem>
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
            </TableCell>}
        </TableRow>
    )
}