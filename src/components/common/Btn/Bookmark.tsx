import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData, arrayRemove, arrayUnion, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default function Bookmark({id,className} : {id : string,className? : string}) {

  const [user] = useAuthState(auth);
  const [status,setStatus] = useState(false);

  const onClick : React.MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation();
    if(!user) return alert('로그인을 해야합니다.');

    const userQuery = query(
      collection(db,"user"),
      where("userId","==",user.uid)
    );

    try {

      const querySnapshot = await getDocs(userQuery);

      querySnapshot.forEach( async (doc)=>{
        const userData = doc.data();
        const bookmarks = userData.bookmark || [];

        if(bookmarks.includes(id)){
          await updateDoc(doc.ref,{
            bookmark : arrayRemove(id)
          });
          setStatus(false);
        }else{
          await updateDoc(doc.ref,{
            bookmark : arrayUnion(id)
          });
          setStatus(true);
        }
      });

    }
    catch(e){
      if(e instanceof FirebaseError){
        console.log(e);
      }
    }
    
  }

  const fetch = async (id : string)=>{

    if(!user) return;

    const userQuery = query(
      collection(db,"user"),
      where("userId","==",user.uid)
    );

    const snapshot = await getDocs(userQuery);

    const data = snapshot.docs.map((doc)=>{
      return doc.data();
    });
    
    const { bookmark } = data.find(el=>el.userId === user.uid) as DocumentData;

    if(bookmark.includes(id)){
      setStatus(true);
    }

  }

  useEffect(()=>{
    fetch(id);
  },[id]);

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer inline-block ${className}`}
    >
      {
        status 
        ? 
          <IoHeart/>
        :
          <IoHeartOutline />
      }
    </div>
  )
}