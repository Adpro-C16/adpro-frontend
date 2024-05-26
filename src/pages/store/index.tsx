import {
    Search,
} from "lucide-react"

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
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SupermarketRow from "@/components/store/SupermarketRow"
import Layout from "@/components/dashboard/Layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import axios from "axios"
import withAuth from "@/hoc/withAuth"

export interface Supermarket {
    id: number;
    name: string;
    balance: number;
    created_at: Date;
    manager_id: number;
}


export default withAuth(function Dashboard() {
    const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
    const [search, setSearch] = useState("");
    const [filteredSupermarkets, setFilteredSupermarkets] = useState<Supermarket[]>([]);

    useEffect(() => {
        if (!search) {
            setFilteredSupermarkets(supermarkets)
            return
        }
        setFilteredSupermarkets(supermarkets.filter(s => s.name.toLowerCase().includes(search.toLowerCase())))
    }, [search])


    useEffect(() => {
        (async () => {
            const { data } = await axios.get("https://heymart-management-6ndsbjpnka-ew.a.run.app/supermarkets")
            console.log(data)
            setSupermarkets(data)
            setFilteredSupermarkets(data)
        })()
    }, [])
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
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center">
                <div className="flex justify-between mb-5 items-center gap-5">
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
                </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Supermarkets</CardTitle>
                    <CardDescription>
                        Find all the supermarkets here
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="md:w-full w-[20px] overflow-x-scroll">
                            {filteredSupermarkets.map(s => (
                                <React.Fragment key={s.id}>
                                    <SupermarketRow
                                        id={s.id}
                                        name={s.name}
                                    />
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    )
})