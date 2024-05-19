import {
    PlusCircle,
    Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SupermarketRow from "@/components/admin/SupermarketRow"
import Layout from "@/components/admin/Layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import withAdmin from "@/hoc/withAdmin"

export default withAdmin(function Dashboard() {
    return (
        <Layout>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/admin/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center">
                <div className="flex justify-between mb-5 items-center gap-5">
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Supermarket
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Supermarkets</CardTitle>
                    <CardDescription>
                        Manage your supermarkets and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Total Sales
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="md:w-full w-[20px] overflow-x-scroll">
                            <SupermarketRow
                                name="Indomaret Kukusan"
                                address="Jl. Kukusan Raya No. 1, Depok"
                                balance={1000000}
                                sales={1000}
                            />
                            <SupermarketRow
                                name="Alfamart Kukusan"
                                address="Jl. Kukusan Raya No. 2, Depok"
                                balance={2000000}
                                sales={2000}
                            />
                            <SupermarketRow
                                name="Indomaret Margonda"
                                address="Jl. Margonda Raya No. 1, Depok"
                                balance={3000000}
                                sales={3000}
                            />
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    )
})
