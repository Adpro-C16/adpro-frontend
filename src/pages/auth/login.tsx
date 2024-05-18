import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lexend } from "next/font/google"
import { FormEventHandler, useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import { CheckCheck, CircleX, Key, User2 } from "lucide-react"
import { toast } from "sonner"
const lexend = Lexend({ subsets: ["latin"] });


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { username, password });
            if (res.status !== 200) throw new Error(res.data);
            localStorage.setItem('token', res.data.body.AuthToken);
            router.replace('/');
            toast('Success!', {
                icon: <CheckCheck size={18} color="green" />,
                description: "You have successfully logged in!",
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            });
        } catch (e) {
            let err = e as AxiosError;
            const msg = err.response?.data as string
            toast('Oops...', {
                icon: <CircleX size={18} color="red" />,
                description: msg.length > 50 ? 'An error occurred while logging in 😔' : msg,
                action: {
                    label: 'Close',
                    onClick: () => { }
                }
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={lexend.style} className="w-full h-svh flex relative">
            <Image src="/icon-192.png" alt="Heymart" width={42} height={42} className="absolute top-5 left-5"/>
            <div className="flex h-full justify-center w-1/2 flex-col items-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        <p className="text-balance text-sm mb-5 mt-2 text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div className="grid gap-3">
                            <Label htmlFor="username" className="flex items-center gap-2"><User2 size={16} />Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password" className="flex items-center gap-2"><Key size={16} />Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button disabled={!username || !password || loading} type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden w-1/2 relative bg-muted lg:block">
                <Image
                    src="/login_side.jpg"
                    alt="Image"
                    fill
                    className="object-cover "
                />
            </div>
        </div>
    )
}
