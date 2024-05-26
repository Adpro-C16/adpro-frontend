import { useRouter } from "next/router";
import { TableCell, TableRow } from "../ui/table";

interface SupermarketRowProps {
    id: number;
    name: string;
}


export default function SupermarketRow({ id, name }: SupermarketRowProps) {

    const router = useRouter();

    return (
        <TableRow>
            <TableCell onClick={() => router.push(`/store/${id}`)} className="font-medium">
                {name}
            </TableCell>
        </TableRow>
    )
}