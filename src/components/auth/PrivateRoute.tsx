import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({children} : {children : React.ReactNode}) {

    const [user] = useAuthState(auth);

    if(!user){
        return <Navigate to={'/'}/>
    }else{
        return <>{children}</>
    }
}
