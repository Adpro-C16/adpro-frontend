import Image from 'next/image'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'
import Head from 'next/head'
import withPublic from '@/hoc/usePublic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User2, Key, Mail } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();

    const handleSubmit:  FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            register({ username, email, password });
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <>
    <Head>
        <title>Register | Heymart C14</title>
    </Head>
    <div className="w-full h-svh flex relative">
    <Image src="/icon-192.png" alt="Heymart" width={42} height={42} className="absolute top-5 left-5"/>
            <div className="flex h-full justify-center w-1/2 flex-col items-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-balance text-sm mb-5 mt-2 text-muted-foreground">
                        Sign Up for Heymart: Savings and Surprises Await!
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
                            <Label htmlFor="email" className="flex items-center gap-2"><Mail size={16} />Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            Register
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Have an account?{" "}
                        <Link href="/auth/login" className="underline">
                            Sign in
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
    </>
  )
}

export default withPublic(RegisterPage)