import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckCheck, CircleX } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const CreateProductModal = ({
    supermarket_id,
    onSuccess,
}: {
    supermarket_id: number;
    onSuccess: () => void;
}) => {

    const [product, setProduct] = useState<Omit<Product, "product_id">>({
        product_name: '',
        product_price: 0,
        supermarket_id: supermarket_id,
    });

    const { authToken } = useAuth();

    const closeBtn = useRef<HTMLButtonElement>(null);

    const createProduct = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, product, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const data = await response.data
            if (data.status_code && data.status_code !== 200) {
                throw new Error(data.message);
            }
            toast.success("Product Created", {
                icon: <CheckCheck size={18} color="green" />,
                description: `Product ${product.product_name} has been created!`,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            })
            closeBtn.current?.click();
            onSuccess();
        } catch (error) {
            console.log(error)
            toast.success("Oops...", {
                icon: <CircleX size={18} color="red" />,
                description: `Failed to create product 😔`,
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
                                createProduct();
                            }} >
                            
                            <DialogHeader>
                                <DialogTitle>Create Product</DialogTitle>
                                <DialogDescription>
                                    Create a new product for your supermarket
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    required
                                    placeholder="Enter product name"
                                    value={product.product_name}
                                    onChange={(e) => setProduct({...product, product_name: e.target.value})}
                                />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="product_price"
                                    className="col-span-3"
                                    type="number"
                                    required
                                    placeholder="Enter product price"
                                    value={product.product_price}
                                    onChange={(e) => setProduct({...product, product_price: Number(e.target.value)})}
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

export default CreateProductModal