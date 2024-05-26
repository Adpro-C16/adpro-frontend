import Image from "next/image"

const LoadingScreen = () => {
  return (
    <main className="w-full h-screen relative">
        <Image src="bg.svg" alt="Heymart" fill className="object-cover block z-0" />
        <div className="z-20 flex items-center justify-center gap-4 flex-col text-white">
            <Image src="/icon-192.png" alt="Heymart" width={192} height={192} className=""/>
            <h1 className="text-2xl">Loading...</h1>
        </div>
    </main>
  )
}

export default LoadingScreen