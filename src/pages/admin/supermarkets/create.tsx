import Link from "next/link"
import {
    CheckCheck,
    ChevronLeft, CircleX,

} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Layout from "@/components/dashboard/Layout"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectContent } from "@radix-ui/react-select"
import { toast } from "sonner"
import { useRouter } from "next/router"

export interface User {
    id: number;
    username: string;
    email: string;
}


export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const { authToken } = useAuth();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("https://heymart-management-6ndsbjpnka-ew.a.run.app/supermarkets/users", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }

            })
            setUsers(data)
        })()
    }, [])

    const [managerId, setManagerId] = useState<number>(-1)
    const [name, setName] = useState<string>("")

    return (
        <Layout>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/admin/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/admin/dashboard">Supermarkets</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Supermarket</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col">
                <div className="flex items-center mb-5 gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Add Supermarket
                    </h1>
                </div>
                <div className="flex items-center my-5 gap-2">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button onClick={async () => {
                        if (managerId === -1) {
                            toast("Invalid Input", {
                                description: "Please select a manager",
                                icon: <CircleX size={18} color="red" />,
                            })
                            return
                        }
                        if (name === "") {
                            toast("Invalid Input", {
                                description: "Please enter the name",
                                icon: <CircleX size={18} color="red" />,
                            })
                            return
                        }

                        await axios.post("https://heymart-management-6ndsbjpnka-ew.a.run.app/supermarkets", {
                            name,
                            manager_id: managerId
                        }, {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }

                        })
                        toast("Supermarket Saved", {
                            description: "Supermarket has been saved successfully",
                            icon: <CheckCheck size={18} color="green" />,
                        })
                        await router.push("/admin/dashboard")
                    }} size="sm">Save Supermarket</Button>
                </div>
                <div className="w-full">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Supermarket Details</CardTitle>
                                <CardDescription>
                                    Isi data supermarket yang ingin anda tambahkan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Manager</Label>
                                        <Select onValueChange={(val) => {
                                            setManagerId(Number(val))
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a manager" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {users.map(user =>
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {user.email}
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            onChange={(e) => setName(e.target.value)}
                                            id="name"
                                            type="text"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
