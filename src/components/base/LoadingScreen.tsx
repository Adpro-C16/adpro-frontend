import Image from "next/image"

const LoadingScreen = () => {
  return (
    <main className="w-full h-screen relative">
        <Image src="/bg.svg" alt="Heymart" fill className="object-cover block z-0" />
        <div className="z-20 flex items-center justify-center gap-4 flex-col text-white w-full h-screen">
            <Image src="/icon-192.png" alt="Heymart" width={150} height={150} className="z-10"/>
            <h1 className="text-2xl sm:text-3xl font-semibold z-10">Loading...</h1>
        </div>
    </main>
  )
}

export default LoadingScreen