import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";
import { toRupiah } from "@/util/rupiahFormater";

interface SupermarketRowProps {
    name: string;
    address: string;
    balance: number;
    sales: number;
}

export default function SupermarketRow({ name, sales, balance, address }: SupermarketRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {name}
            </TableCell>
            <TableCell className="font-medium">
                {address}
            </TableCell>
            <TableCell>{toRupiah(balance)}</TableCell>
            <TableCell className="hidden md:table-cell">
                {sales}
            </TableCell>
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}