import { useEffect, useState } from "react";
import Card, { CardType } from "../../components/main/Card";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FirebaseError } from "firebase/app";

export default function Bookmark() {

  const [bookmark,setBookmark] = useState<CardType[]>([]);

  const fetch = async ()=>{

    const user = auth.currentUser;
    if(!user) return;

    const fetchQuery = query(
      collection(db,"user"),
      where("userId","==",user.uid)
    );
    
    const snapshot = await getDocs(fetchQuery);

    snapshot.docs.forEach( async (docs) => {
      const {bookmark} = docs.data();
      
      for (const docid of bookmark){
        try {
          const docRef = doc(db,"shoes",docid);
          const docSnapshot = await getDoc(docRef);
          const data = docSnapshot.data();
          setBookmark([...bookmark,data]);
        }
        catch(e){
          if(e instanceof FirebaseError){
            console.log(e);
          }
        }
      }

    });

  }

  useEffect(()=>{
    fetch();
  },[]);

  return (
    <div className='_list'>

        <div className="h-[450px] text-center bg-no-repeat bg-right-bottom bg-cover bg-fixed bg-[url(/asset/image/list/listBg01.jpg)]"></div>

        <div className="py-24 max-w-[1600px] w-[95%] mx-auto">

            <h1 className="text-5xl font-bold mb-5">관심상품</h1>

            <div className="grid grid-cols-5 gap-x-7 gap-y-16 mt-12">
              {
                bookmark.length > 0
                ?
                  bookmark.map((e)=><Card key={e.id+"11"} {...e}/>)
                :
                  null
              }
            </div>

        </div>
        
    </div>
  )
}
