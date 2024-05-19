import { Navigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export default function PublicRoute({children} : {children : React.ReactNode}) {

    const [user] = useAuthState(auth);

    if(!user){
        return <>{children}</>
    }else{
        return <Navigate to={'/'}/>
    }
    
}
