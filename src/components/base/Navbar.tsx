import { useAuth } from "@/context/AuthContext";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const Navbar = () => {
  const [isBlur, setIsBlur] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const { authToken, user } = useAuth();

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

    <nav style={bricolage.style} className={`flex items-center justify-between px-5 md:px-12 h-[72px] fixed z-50 w-vw text-white ${router.pathname === '/' ? "fixed top-0 left-0 w-full" : "bg-primary-500 sticky top-0 left-0 "} ${router.pathname === '/' && isBlur ? "backdrop-blur bg-white bg-opacity-5 border-b-2 border-opacity-20 border-b-white" : ""}`}>
      <Link href="/" className="flex items-center gap-3 relative">
        <Image src="/icon-192.png" alt="Heymart" width={42} height={42} className="" />
        <h1 className="text-3xl font-bold ">Heymart</h1>
      </Link>
      <ul onClick={() => setShow(false)} className={`fixed top-0 sm:static ${show ? "left-0 bg-primary-500" : "-left-full"} text-xl sm:text-lg w-full h-svh sm:w-fit sm:h-full transition-all duration-500 flex items-center justify-center flex-col sm:flex-row gap-5 font-medium`}>
        <li>
          <Link href="/products">Explore</Link>
        </li>
        {
          authToken ? (
            // <>
            <li>
              <Link href={user.role === "Admin" ? `/admin/dashboard` : "/dashboard"}>Dashboard</Link>
            </li>
            // <li>
            //   <button onClick={logout}>Logout</button>
            // </li>
            // </>
          ) : (
            <li>
              <Link href="/auth/login" className="px-3 py-2 border-white rounded-lg block border-2">Sign in</Link>
            </li>
          )

        }
      </ul>
      <button className='md:hidden z-[1]' onClick={() => setShow(!show)}>
        <div className={`w-6 h-0.5 rounded bg-white mb-1.5 transition-all ${show ? "rotate-45 translate-y-2" : ""}`}></div>
        <div className={`w-4 h-0.5 rounded bg-white mb-1.5 ${show ? "-translate-x-5 opacity-0" : ""} transition-all`}></div>
        <div className={`w-6 h-0.5 rounded bg-white transition-all ${show ? "-rotate-45 -translate-y-2" : ""}`}></div>
      </button>
    </nav>
  )
}

export default Navbar