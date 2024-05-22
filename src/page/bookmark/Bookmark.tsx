import { useEffect, useState } from "react";
import Card from "@components/common/Card/Card";
import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Bookmark() {

  const [bookmarks,setBookmarks] = useState<any[]>([]);

  const fetch = async ()=>{

    const user = auth.currentUser;
    if(!user) return;

    const fetchQuery = query(
      collection(db,"user"),
      where("userId","==",user.uid)
    );
    
    const snapshot = await getDocs(fetchQuery);

    const {bookmark} = snapshot.docs[0].data();

    const bookPromise = bookmark.map( async (id : string)=>{
      const data = await getDoc(doc(db,"shoes",id));
      return {
        ...data.data(),
        id
      }
    });

    const results = await Promise.all(bookPromise);

    setBookmarks(results);

  }

  useEffect(()=>{
    fetch();
  },[]);

  return (
    <div>

        <div className="h-[350px] md:h-[450px] text-center bg-no-repeat bg-right-bottom bg-cover bg-fixed bg-[url(/asset/image/list/listBg01.jpg)]"></div>

        <div className="py-24 max-w-[1600px] w-[95%] mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold mb-5">관심상품</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-7 gap-y-16 mt-12">
              {
                bookmarks.length > 0
                ?
                  bookmarks.map((item,index)=><Card key={`${item.id}book${index}`} {...item}/>)
                :
                  null
              }
            </div>

        </div>
        
    </div>
  )
}
