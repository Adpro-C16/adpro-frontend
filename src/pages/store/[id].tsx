import Navbar from '@/components/base/Navbar'
import ProductCard from '@/components/base/ProductCard'
import withAuth from '@/hoc/withAuth'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const SupermarketProductsPage = () => {

    const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const getOrders = async (supermarket_id: number) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SUPERMARKET_URL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data: Product[] = await response.data
        setProducts(data.filter(product => product.supermarket_id === supermarket_id));
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    if (router.isReady) {
        const { id } = router.query;
        getOrders(Number(id));
    }
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

export default SupermarketProductsPage