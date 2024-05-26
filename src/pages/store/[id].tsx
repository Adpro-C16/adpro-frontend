import ProductCard from '@/components/base/ProductCard'
import Layout from '@/components/dashboard/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TableBody, Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import withAuth from '@/hoc/withAuth'
import axios from 'axios'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from 'next/link'

const SupermarketProductsPage = () => {

    const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [supermarket, setSupermarket] = useState<Supermarket>();

  const getSupermarket = async (supermarket_id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/supermarkets/${supermarket_id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Supermarket = await response.data
        setSupermarket(data);
    } catch (error) {
        console.log(error)
    }
}

  const getOrders = async (supermarket_id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Product[] = await response.data
        const products = data.filter(product => product.supermarket_id === supermarket_id);
        setProducts(products);
        setFilteredProducts(products);
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    if (router.isReady) {
        const { id } = router.query;
        getSupermarket(Number(id));
        getOrders(Number(id));
    }
  }, [])

  useEffect(() => {
    if (!search) {
        setFilteredProducts(products)
        return
    }
    setFilteredProducts(products.filter(s => s.product_name.toLowerCase().includes(search.toLowerCase())))
}, [search])

  return (
    <Layout>
        <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/store">Store</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/store/1">{supermarket?.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        <Card>
            <CardHeader>
                <CardTitle>{supermarket?.name}</CardTitle>
                <CardDescription>Joined since {supermarket?.created_at ? new Date(supermarket!.created_at).toLocaleDateString() : "-"}</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle>Products</CardTitle>
                <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredProducts.map((product) => (
                                <ProductCard key={product.product_id} {...product} />
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        
    </Layout>
  )
}

export default withAuth(SupermarketProductsPage)