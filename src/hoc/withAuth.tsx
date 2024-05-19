import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

const withAuth = <T extends object>(Component: ComponentType<T>) => {
    return function WithAuth(props: T) {

        const [loading, setLoading] = useState(true);

        const router = useRouter();

        const { authToken } = useAuth();

        useEffect(() => {
            if (!authToken) {
                router.replace('/auth/login').then(() => {
                    setLoading(false);
                });
            }
            setLoading(false);
        }, [])


        return !loading ? <Component {...props} /> : <div></div>

    }
}

export default withAuth