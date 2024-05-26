import Navbar from '@/components/base/Navbar'
import ProductCard from '@/components/base/ProductCard'
import withAuth from '@/hoc/withAuth'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StorePage = () => {

  const [products, setProducts] = useState<Product[]>([]);

  const getOrders = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Product[] = await response.data
        setProducts(data);
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
    <Navbar />
    <main className='min-h-svh p-5 px-10 bg-secondary'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {
          products.map((product) => (
              <ProductCard key={product.product_id} {...product} />
          ))
        }
        </ul>
    </main>
    </>
  )
}

export default withAuth(StorePage)