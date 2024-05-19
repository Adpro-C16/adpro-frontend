import { useAuth } from "@/context/AuthContext";
import { StopCircle } from "lucide-react";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";
import { toast } from "sonner";

const withAdmin = <T extends object>(Component: ComponentType<T>) => {
    return function WithAdmin(props: T) {

        const [loading, setLoading] = useState(true);

        const router = useRouter();

        const { user } = useAuth();

        useEffect(() => {
            if (user.role.toUpperCase() !== 'ADMIN') {
                toast('Unauthorized', {
                    icon: <StopCircle size={18} color='red' />,
                    description: 'You are not authorized to view this page',
                    action: {
                        label: 'Close',
                        onClick: () => { }
                    }
                });
                router.replace('/auth/login').then(() => {
                    setLoading(false);
                });
            }
            setLoading(false);
        }, [])


        return !loading ? <Component {...props} /> : <div></div>

    }
}

export default withAdmin