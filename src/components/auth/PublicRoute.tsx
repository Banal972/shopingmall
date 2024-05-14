import { Navigate } from "react-router-dom";
import { auth } from "../../firebase"

export default function PublicRoute({children} : {children : React.ReactNode}) {

    const user = auth.currentUser;

    if(!user){
        return <>{children}</>
    }else{
        return <Navigate to={'/'}/>
    }
    
}
