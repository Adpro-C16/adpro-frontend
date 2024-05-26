import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { toRupiah } from "@/util/rupiahFormater"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { CheckCheck, CircleX, Minus, Plus } from "lucide-react"
import { Input } from "../ui/input"
import { TableCell, TableRow } from "../ui/table"


const ProductCard = ({
    product_id,
    product_name,
    product_price,
    supermarket_id,
}: Product) => {

  const [quantity, setQuantity] = useState(0);

  const { authToken } = useAuth();

  const addToCart = async () => {
    try {
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ORDER_URL}/orders`, {
        product_name,
        supermarket_id,
        quantity,
        subtotal: product_price * quantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      }
    });
    if (res.status !== 200) throw new Error(res.data);
    toast.success('Added to cart successfully', {
      description: `${product_name} added to cart successfully`,
      icon: <CheckCheck size={18} color="green" />,
    });
  } catch (error) {
    console.log(error);
    toast.error("Oops...", {
      description: "Failed to add to cart😔",
      icon: <CircleX size={18} color="red" />,
    });
  }
  }

  return (
    <TableRow key={product_id}>
            <TableCell>{product_name}</TableCell>
            <TableCell>
            {toRupiah(product_price)}
            </TableCell>
        <TableCell className="gap-3 flex-col">
            <div className="flex items-center">
              <Button onClick={() => setQuantity(quantity => quantity - 1 < 0 ? 0 : quantity - 1)} variant="outline" size="sm" className="h-9 rounded-r-none">
                <Minus size={16} />
              </Button>
              <Input
                  id="product-quantity-num-input"
                  className="h-full rounded-none border-x-0 w-12"
                  type="number"
                  required
                  placeholder="Enter amount"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button onClick={() => setQuantity(quantity => quantity + 1)} variant="outline" size="sm" className="h-9 rounded-l-none">
                <Plus size={16} />
              </Button>
            </div>
        </TableCell>
        <TableCell>
            <Button onClick={addToCart} size="sm" className="w-full">Add to Cart</Button>
        </TableCell>
    </TableRow>
  )
}

export default ProductCard