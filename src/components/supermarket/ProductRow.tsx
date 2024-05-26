import { CheckCheck, Circle, CircleX, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { TableCell, TableRow } from "../ui/table";
import { useState } from "react";
import { toRupiah } from "@/util/rupiahFormater";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";



export default function ProductRow({ product, supermarket }: { product: Product, supermarket: Supermarket }) {
    const [edit, setEdit] = useState(false)
    const { authToken } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [itemName, setItemName] = useState(product.product_name)
    const [itemPrice, setItemPrice] = useState(product.product_price)

    const getProducts = async (supermarket_id: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data: Product[] = await response.data
            setProducts(data.filter(product => product.supermarket_id === supermarket_id));
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data = await response.data
            if (data.status_code && data.status_code !== 200) {
                throw new Error(data.message);
            }
            toast.success("Product Deleted", {
                icon: <CheckCheck size={18} color="green" />,
                description: `Product has been deleted!`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
            getProducts(supermarket!.id);
        } catch (error) {
            console.log(error);
            toast.error("Oops...", {
                icon: <CircleX size={18} color="red" />,
                description: `Failed to delete product 😔`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
        }
    }

    return (
        <TableRow key={product.product_id}>
            <TableCell className="font-medium">
                {!edit ? itemName : (
                    <Input
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                    />
                )}
            </TableCell>
            <TableCell>{!edit ? toRupiah(itemPrice) : (
                <Input
                    onChange={(e) => setItemPrice(+e.target.value)}
                    value={itemPrice}
                />
            )}</TableCell>
            {edit ? (
                <>
                    <TableCell>
                        <CheckCheck onClick={async () => {
                            if (!itemName || !itemPrice) {
                                return
                            }
                            toast.success("Product Updated", {
                                icon: <CheckCheck size={18} color="green" />,
                                description: `Product has been updated!`,
                                action: {
                                    label: 'Close',
                                    onClick: () => { }
                                }
                            })
                            await axios.put(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products/${product.product_id}`, {
                                name: itemName,
                                product_price: itemPrice
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${authToken}`
                                }
                            })
                            setEdit(false)
                        }} size={18} color="green" className="cursor-pointer" />
                    </TableCell>
                    <TableCell>
                        <CircleX onClick={() => {
                            setItemName(product.product_name)
                            setItemPrice(product.product_price)
                            setEdit(false)
                        }} size={18} color="red" className="cursor-pointer" />
                    </TableCell>
                </>
            ) : null}
            {!edit ? <TableCell>
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
                        <DropdownMenuItem onClick={() => deleteProduct(product.product_id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell> : null}
        </TableRow>
    )
}