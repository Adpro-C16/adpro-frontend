import Image from 'next/image'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Head from 'next/head'
import withPublic from '@/hoc/usePublic'

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit:  FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, { username, password, email });
            if (res.status !== 200) throw new Error(res.data);
            router.replace('/auth/login');
            toast.success('Registered successfully');
        } catch(e) {
            let err = e as AxiosError;
            toast.error(err.response?.data as string);
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <Head>
        <title>Register | Heymart C14</title>
    </Head>
    <main className='flex h-screen p-5 relative'>
        <h1 className="absolute text-3xl font-semibold flex items-center text-blue-500">
            <span className='text-green-600'>Hey</span>
            mart 
        </h1>
        <div className='w-1/2 flex justify-center items-center flex-col'>
            <div className="relative w-[500px] h-[500px]">
            <Image src='/shopping.svg' alt='login' fill className='object-cover' />
            </div>
            <h1 className='text-lg -mt-5 opacity-70 text-center'>Shopping has never been eaiser with Heymart</h1>
        </div>
        <div className='w-1/2 flex justify-center items-start flex-col px-12'>
            <div className="w-full max-w-lg">

            <h1 className='text-5xl font-bold w-full text-left mb-8'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full max-w-lg'>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                  <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input type="password" className="grow" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button disabled={!username || !password || loading} className="btn btn-primary text-white">Log in</button>
            </form>
            <p className='mt-8'>
                Have an account? <Link href="/auth/login" className="text-blue-500">Sign in</Link>
            </p>
            </div>
        </div>
    </main>
    </>
  )
}

export default withPublic(RegisterPage)