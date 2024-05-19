import axios, { AxiosError } from "axios";
import { CheckCheck, CircleX } from "lucide-react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    authToken: string;
    user: {id: number; role: string, username: string; email: string; balance: number};
    login: (user: {username: string; password: string}) => void;
    register: (user: {username: string; email: string; password: string}) => void;
    logout: () => void;
    };

const AuthContext = createContext<AuthContextType>({
    authToken: "",
    user: {id: -1, role: "", username: "", email: "", balance: 0},
    login: () => {},
    register: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [authToken, setAuthToken] = useState("");
    const [user, setUser] = useState({
        id: -1,
        role: "",
        username: "",
        email: "",
        balance: 0
    });

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
        setUser({id: -1, role: "", username: "", email: "", balance: 0});
        router.replace('/auth/login');
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            let decoded = jwtDecode<{exp: number; id: number; role: string}>(token);
            if (decoded.exp * 1000 < Date.now()) {
                logout();
            } else {
                setAuthToken(token);
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        console.log(res)
                        setUser(res.data);
                    }).catch(() => {
                        logout();
                    });
            }
        }
    }, [])

    const contextValue = useMemo(() => ({
        authToken,
        login,
        register,
        logout,
        user
    }), [authToken, login, register, logout, user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);