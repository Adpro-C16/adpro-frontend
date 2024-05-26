import Navbar from '@/components/base/Navbar'
import withAuth from '@/hoc/withAuth'
import React from 'react'

const ProductsPage = () => {
  return (
    <>
    <Navbar />
    <main className='min-h-svh'>
        
    </main>
    </>
  )
}

export default withAuth(ProductsPage)