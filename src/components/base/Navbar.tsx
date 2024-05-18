import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Navbar = () => {
  const [isBlur, setIsBlur] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsBlur(true)
      } else {
        setIsBlur(false)
      }
    })
  }, [])

  return (
    <nav className={`flex items-center justify-between px-5 sm:px-12 h-16 z-50 fixed top-0 left-0 w-svw text-white ${isBlur ? "backdrop-blur bg-white bg-opacity-5 border-b-2 border-opacity-20 border-b-white" : ""}`}>
      <div className="flex items-center gap-3 relative">
        <Image src="/icon-192.png" alt="Heymart" width={42} height={42} className=""/>
        <h1 className="text-3xl font-bold ">Heymart</h1>
      </div>
      <ul className="flex items-center gap-5 font-medium text-lg">
        <li>
          <Link href="/">Explore</Link>
        </li>
        <li>
          <Link href="/">Register your supermarket</Link>
        </li>
        <li>
          <Link href="/auth/login" className="px-3 py-2 border-white rounded-lg block border-2">Sign in</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar