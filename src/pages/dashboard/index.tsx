import withAuth from '@/hoc/withAuth'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Layout from '@/components/dashboard/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toRupiah } from '@/util/rupiahFormater'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Package, ShoppingCart, MoreHorizontal, Banknote, CheckCheck, CircleX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const OrdersPage = () => {

    const { authToken, user, setUser } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);
    const [cart, setCart] = useState<Order[]>([]);

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
            setOrders(data);
            setCart(data.filter(order => order.status === "WaitingPayment"));
        } catch (error) {
            console.log(error)
        }
    }

    const pay = async (id: number) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_ORDER_URL}/orders/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            })
            const data = await response.data
            if (data.status_code && data.status_code !== 200) {
                throw new Error(data.message);
            }
            setUser({
                ...user,
                balance: user.balance - data.subtotal
            });
            await axios.post(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/supermarkets/topup/${data.supermarket_id}`, {
                amount: data.subtotal
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success("Payment Successfull", {
                icon: <CheckCheck size={18} color="green" />,
                description: `Item ${data.product_name} has been paid successfully!`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })

            getOrders();
        } catch (error) {
            console.log(error)
            toast.success("Oops...", {
                icon: <CircleX size={18} color="red" />,
                description: `Failed to pay order 😔`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <Layout>
            <div className="flex justify-between gap-8 items-stretch flex-col sm:flex-row max-w-screen">

                <Card className='w-full'>
                    <CardHeader className='w-full h-full justify-center'>
                        <div className="flex items-center gap-4">

                            <Banknote className="h-10 w-10 text-primary" />
                            <div className="">
                                <h4 className="text-xl font-semibold">Balance</h4>
                                <p className="text-lg text-muted-foreground">{toRupiah(user.balance)}</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className='w-full'>
                    <CardHeader className='w-full h-full justify-center'>
                        <div className="flex items-center gap-4">
                            <Package className="h-10 w-10 text-primary" />
                            <div>
                                <h4 className="text-xl font-semibold">Total Orders</h4>
                                <p className="text-lg text-muted-foreground">You have made {orders.length} orders</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className='w-full'>
                    <CardHeader className='w-full h-full justify-center'>
                        <div className="flex items-center gap-4">
                            <ShoppingCart className="h-10 w-10 text-primary" />
                            <div>
                                <h4 className="text-xl font-semibold">Wishlisted Items</h4>
                                <p className="text-lg text-muted-foreground">You have {cart.length} items in your cart</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Cart</CardTitle>
                    <CardDescription>
                        Here are the list of items in your cart
                    </CardDescription>
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
                                <TableHead>
                                    <span className="">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                cart.length > 0 ?
                                    cart.map(order => (
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
                                                        <DropdownMenuItem onClick={() => pay(order.id)}>Pay</DropdownMenuItem>
                                                        {/* <DropdownMenuItem>Cancel</DropdownMenuItem> */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-xl py-7">No items in your cart   </TableCell>
                                    </TableRow>
                            }

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                        Here are the list of orders you&apos;ve made
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
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
                                orders.filter(order => order.status !== "WaitingPayment").length > 0 ?
                                    orders.filter(order => order.status !== "WaitingPayment").map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">
                                                {order.id}
                                            </TableCell>
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
                                        <TableCell colSpan={6} className="text-center text-xl py-7">No orders found</TableCell>
                                    </TableRow>
                            }

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default withAuth(OrdersPage)