interface Order {
    id: number
    user_id: number
    supermarket_id: number
    product_name: string
    subtotal: number
    quantity: number
    status: string
    created_at: string
}

interface Supermarket {
    id: number
    name: string
    balance: number
    created_at: string
    manager_id: number
}

interface Product {
    product_id: number
    product_name: string
    product_price: number
    supermarket_id: number
}

