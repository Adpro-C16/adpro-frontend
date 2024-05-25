import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#F0F0AD] px-8 sm:px-10 md:px-20 py-8 sm:py-12'>
      <div className="flex items-start flex-col sm:flex-row gap-12 text-[#454545] font-medium">
        <ul className='flex flex-col gap-2'>
          <li>
            <h3 className='text-xl font-bold text-black'>
              Be Our Partner
            </h3>
          </li>
          <li>
            <Link href='/'>
              Register your supermarket
              </Link>
          </li>
          <li>
            Sellers guideline
          </li>
          <li>
            How we can help you grow
          </li>
          <li>
            See benefits
          </li>
        </ul>
        <ul className='flex flex-col gap-2'>
          <li>
            <h3 className='text-xl font-bold text-black'>
              Shop With Us
            </h3>
          </li>
          <li>
            <Link href='/stores'>
              Search our stores
              </Link>
          </li>
          <li>
            Buying in Heymart
          </li>
          <li>
            HeyMart Pro
          </li>
        </ul>
        <ul className='flex flex-col gap-2'>
          <li>
            <h3 className='text-xl font-bold text-black'>
              Customer Service
            </h3>
          </li>
          <li>
            Help & Support
          </li>
          <li>
            Trust & Safety
          </li>
          <li>
            HeyMart guides
          </li>
        </ul>
      </div>
      <h3 className='font-bold mt-12'>© HeyMart International Ltd. 2024</h3>
    </footer>
  )
}

export default Footer