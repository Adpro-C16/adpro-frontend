import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { toRupiah } from "@/util/rupiahFormater";
import { CheckCheck, CircleX } from "lucide-react";

const UserSettings = () => {

    const { user, logout, authToken, setUser } = useAuth();

    const [amount, setAmount] = useState<number>(0);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const topup = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/topup`, {
                amount
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
            )
            const data = await response.data
            if (data.status_code && data.status_code !== 200) {
                throw new Error(data.message);
            }
            setUser({
                ...user,
                balance: user.balance + amount
            });
            toast.success("Topup Successfull", {
                icon: <CheckCheck size={18} color="green" />,
                description: `Topup of ${toRupiah(amount)} has been added to your account!`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
            setIsOpened(false);
        } catch (error) {
            console.log(error)
            toast.success("Oops...", {
                icon: <CircleX size={18} color="red" />,
                description: `Failed to topup account 😔`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src={user?.username ? `https://ui-avatars.com/api/?background=115c02&color=fff&name={${user?.username.replace(" ", "+")}}` : `https://ui-avatars.com/api/?background=115c02&color=fff&name=John+Doe`}
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                        <Button onClick={() => setIsOpened(true)} variant="ghost" className="px-2 py-1.5 h-fit w-full justify-start font-normal">
                            Topup
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isOpened}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        topup()
                    }} >

                        <DialogHeader>
                            <DialogTitle>Topup</DialogTitle>
                            <DialogDescription>
                                Add funds to your account
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    className="col-span-3"
                                    type="number"
                                    required
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            <Button onClick={() => setIsOpened(false)} type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default UserSettings