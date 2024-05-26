import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CheckCheck, CircleX } from "lucide-react";
import { toRupiah } from "@/util/rupiahFormater";
import { toast } from "sonner";
import axios from "axios";


const WithdrawModal = ({
    supermarket_id,
    onSuccess,
}: {
    supermarket_id: number;
    onSuccess: () => void;
}) => {

    const [amount, setAmount] = useState<number>(0);

    const { authToken, user, setUser } = useAuth();

    const closeBtn = useRef<HTMLButtonElement>(null);

    const withdraw = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/supermarkets/topup/${supermarket_id}`, {
                amount: -amount
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.data
            if (data.status_code && data.status_code !== 200) {
                throw new Error(data.message);
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/topup`, {
                amount
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
            )
            const user_data = await response.data
            if (user_data.status_code && user_data.status_code !== 200) {
                throw new Error(user_data.message);
            }
            setUser({
                ...user,
                balance: user.balance + amount
            });
            toast.success("Withdraw Successfull", {
                icon: <CheckCheck size={18} color="green" />,
                description: `${toRupiah(amount)} has been withdrawn to your account!`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
            onSuccess();
            closeBtn.current?.click();
        } catch (error) {
            console.log(error)
            toast.success("Oops...", {
                icon: <CircleX size={18} color="red" />,
                description: `Failed to withdraw 😔`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
        }
    }

  return (
    <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        withdraw();
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
                            <DialogClose>
                                <Button ref={closeBtn} type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
  )
}

export default WithdrawModal