import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";

export default function useGetUser() {
  
    const [user, setUser] = useState<User | null>(null); // 사용자 상태

    useEffect(()=>{

        // Firebase Auth 리스너
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // 사용자가 로그인된 경우
                setUser(user);
            } else {
                // 사용자가 로그아웃된 경우
                setUser(null);
            }
        });
    
        // 컴포넌트 언마운트 시 리스너 해제
        return () => unsubscribe();

    },[]);

    return user;

}
