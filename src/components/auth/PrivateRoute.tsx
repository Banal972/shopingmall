import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function PrivateRoute({children} : {children : React.ReactNode}) {

    const user = auth.currentUser;

    if(!user){
        return <Navigate to={'/'}/>
    }else{
        return <>{children}</>
    }
}
