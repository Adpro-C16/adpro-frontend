import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

const withPublic = <T extends object>(Component: ComponentType<T>) => {
    return function WithPublic(props: T) {

        const [loading, setLoading] = useState(true);

        const router = useRouter();

        useEffect(() => {
            let token = localStorage.getItem('token');
            if (token) {
                router.replace('/').then(() => {
                    setLoading(false);
                })
            }
            setLoading(false);
        }, [])


        return !loading ? <Component {...props} /> : <div></div>

    }
}

export default withPublic