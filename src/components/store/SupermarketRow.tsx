import { TableCell, TableRow } from "../ui/table";

interface SupermarketRowProps {
    id: number;
    name: string;
}


export default function SupermarketRow({ id, name }: SupermarketRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {name}
            </TableCell>
        </TableRow>
    )
}