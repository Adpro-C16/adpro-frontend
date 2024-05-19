import axios, { AxiosError } from "axios";
import { CheckCheck, CircleX } from "lucide-react";
import { useRouter } from "next/router";
import { createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

type AuthContextType = {
    authToken: string;
    login: (user: {username: string; password: string}) => void;
    register: (user: {username: string; email: string; password: string}) => void;
    logout: () => void;
    };

const AuthContext = createContext<AuthContextType>({
    authToken: "",
    login: () => {},
    register: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [authToken, setAuthToken] = useState("");

    const router = useRouter();

    const login = async ({username, password}: {username: string; password: string}) => {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { username, password });
            if (res.status !== 200) throw new Error(res.data);
            localStorage.setItem('token', res.data.body.AuthToken);
            setAuthToken(res.data.body.AuthToken);
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
        }
    }

    const register = async ({username, email, password}: {username: string; email: string; password: string}) => {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, { username, password, email });
            if (res.status !== 200) throw new Error(res.data);
            router.replace('/auth/login');
            toast.success('Registered successfully');
        } catch(e) {
            let err = e as AxiosError;
            toast.error(err.response?.data as string);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken('');
        router.replace('/auth/login');
    }

    const contextValue = useMemo(() => ({
        authToken,
        login,
        register,
        logout,
    }), [authToken, login, register, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);