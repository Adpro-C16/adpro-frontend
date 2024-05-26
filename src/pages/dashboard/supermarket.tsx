import Layout from "@/components/dashboard/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { toRupiah } from "@/util/rupiahFormater";
import { Button } from "@/components/ui/button";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { Banknote, Package, Plus, MoreHorizontal, SquareGanttChart, CheckCheck, CircleX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from "sonner";


const SupermarketPage = () => {

    const [supermarket, setSupermarket] = useState<Supermarket | null>();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const { authToken, user } = useAuth();

    const getSupermarket = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/supermarkets/manager/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data: Supermarket[] = await response.data
            setSupermarket(data.length > 0 ? data[0] : null);
        } catch (error) {
            console.log(error)
        }
    }

    const getOrders = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ORDER_URL}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data: Order[] = await response.data
            setOrders(data.filter(order => order.supermarket_id === user.id));
        } catch (error) {
            console.log(error)
        }
    }

    const getProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data: Product[] = await response.data
            setProducts(data);
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
            getProducts();
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

    useEffect(() => {
        getSupermarket().then(() => {
        getOrders();
        getProducts();
        });
    }, [])

    if (!supermarket) {
        return (
            <Layout>
                <Card>
                    <CardHeader>
                        <CardTitle>Supermarket</CardTitle>
                        <CardDescription>Manage your supermarket here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-xl py-7">You don&apos;t have a supermarket yet</p>
                    </CardContent>
                </Card>
            </Layout>
        )
    }

  return (
    <Layout>
        <Card>
            <CardHeader>
                <CardTitle>{supermarket?.name}</CardTitle>
                <CardDescription>Joined since {new Date(supermarket?.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
        </Card>
        <div className="flex justify-between gap-8 items-stretch flex-col sm:flex-row max-w-screen">

        <Card className='w-full'>
            <CardHeader className='w-full h-full justify-center'>
                <div className="flex items-center gap-4">
            <Banknote className="h-10 w-10 text-primary" />
                <div className="">
                    <h4 className="text-xl font-semibold">Balance</h4>
                    <p className="text-lg text-muted-foreground">{toRupiah(supermarket.balance)}</p>
                </div>
                </div>
            </CardHeader>
        </Card>
        <Card className='w-full'>
        <CardHeader className='w-full h-full justify-center'>
                <div className="flex items-center gap-4">
                    <Package className="h-10 w-10 text-primary" />
                    <div>
                        <h4 className="text-xl font-semibold">Products</h4>
                        <p className="text-lg text-muted-foreground">You have {products.length} products</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card className='w-full'>
        <CardHeader className='w-full h-full justify-center'>
                <div className="flex items-center gap-4">
                    <SquareGanttChart className="h-10 w-10 text-primary" />
                    <div>
                        <h4 className="text-xl font-semibold">Orders</h4>
                        <p className="text-lg text-muted-foreground">You have {orders.length} orders made</p>
                    </div>
                </div>
            </CardHeader>
        </Card>
        </div>
            <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="">
                        <CardTitle>Products</CardTitle>
                        <CardDescription>Here are the list of product&apos;s your supermaket sells</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="default">
                                <Plus className="h-5 w-5 mr-2" />
                                Create Product
                            </Button>
                        </DialogTrigger>
                        <CreateProductModal onSuccess={() => getProducts()} supermarket_id={supermarket!.id} />
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
        <Table>
            <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
            <TableBody> 
            {
                products.length > 0 ?
                products.map(product => (
                    <TableRow key={product.product_id}>
            <TableCell className="font-medium">
                {product.product_name}
            </TableCell>
            <TableCell>{toRupiah(product.product_price)}</TableCell>
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
                        <DropdownMenuItem onClick={() => deleteProduct(product.product_id)}>Delete</DropdownMenuItem>
                        {/* <DropdownMenuItem>Cancel</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
                ))
                :
                <TableRow>
                    <TableCell colSpan={6} className="text-center text-xl py-7">No products have been made</TableCell>
                </TableRow>
            }
            
            </TableBody>
        </Table>
            </CardContent>
        </Card>
            <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Here are the list of order&apos;s</CardDescription>
            </CardHeader>
            <CardContent>
        <Table>
            <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date
                                </TableHead>

                            </TableRow>
                        </TableHeader>
            <TableBody> 
            {
                orders.length > 0 ?
                orders.map(order => (
                    <TableRow key={order.id}>
            <TableCell className="font-medium">
                {order.product_name}
            </TableCell>
            <TableCell className="font-medium">
                {order.quantity}
            </TableCell>
            <TableCell>{toRupiah(order.subtotal)}</TableCell>
            <TableCell className="hidden md:table-cell">
                <Badge variant={order.status === "Paid" ? "default" : "secondary"}>{order.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(order.created_at).toLocaleString()}
            </TableCell>
        </TableRow>
                ))
                :
                <TableRow>
                    <TableCell colSpan={6} className="text-center text-xl py-7">No orders have been made</TableCell>
                </TableRow>
            }
            
            </TableBody>
        </Table>
            </CardContent>
        </Card>
    </Layout>
  )
}

export default withAuth(SupermarketPage)