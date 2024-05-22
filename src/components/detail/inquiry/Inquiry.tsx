import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { InquiryType } from "../../../@types/inquiry";
import moment from "moment";
import { FirebaseError } from "firebase/app";
import { Unsubscribe } from "firebase/database";

export default function Inquiry({id} : {id : string}) {
    
    const user = auth.currentUser;
    //navigate
    const navigate = useNavigate();

    const [inquirys,setInquirys] = useState<InquiryType[]>([]);

    // 수정버튼
    const updateHanlder = (id : string)=>{
        navigate(`/detail/edit/${id}`);
    }

    // 삭제버튼
    const delHandler = async (id : string)=>{

        if(!id) return;

        if(window.confirm('삭제 하시겠습니까?')){

            try {
                await deleteDoc(doc(db,"inquiry",id));
                alert('삭제가 완료 되었습니다.');
            }
            catch(e){
                if(e instanceof FirebaseError){
                    console.log(e);
                }
            }

        }
        
    }

    useEffect(()=>{

        let unsubscribe : Unsubscribe | null = null;

        const fetch = async ()=> {

            if(!db) return;
            const inquiryQuery = query(
                collection(db,"inquiry"),
                where("productId","==",id)
            );

            // const snapshot = await getDocs(inquiryQuery);
    
            unsubscribe = await onSnapshot(inquiryQuery,(snapshot)=>{
            
                const doc = snapshot.docs.map((doc)=>{
                    const data = doc.data() as InquiryType;
        
                    return {
                        ...data,
                        id : doc.id
                    }
        
                });
        
                setInquirys(doc);
                
            });

        }

        fetch();

        return ()=>{
            unsubscribe && unsubscribe();
        }
        
    },[]);

    const onWriteRoute = ()=>{

        if(!user) return alert('로그인을 해야합니다.');

        navigate(`/detail/write/${id}`);

    }

    return (
        <div className="mt-12">

            <ul className="border-b border-b-[#999] pb-6">
                {
                    inquirys.length > 0 
                    ?
                        (
                            inquirys.map((inquiry,index)=>(
                                <li className={`${index !== 0 ? "mt-6 pt-6 border-t border-t-[#000]" : ""}`}>
                                    <p className="text-xs">작성자 - {inquiry.writer}</p>
                                    <h2 className="text-xl mt-1 font-bold">{inquiry.title}</h2>
                                    <p className="text-sm mt-3 text-[#555]">{moment(inquiry.created).format("YYYY/MM/DD")}</p>
                                    {
                                        user?.uid === inquiry.userId &&
                                        <div className="flex justify-end">
                                            <button 
                                                className="text-sm w-16 h-7 bg-[#26a8e0] text-white cursor-pointer"
                                                onClick={()=>updateHanlder(inquiry.id as string)}
                                            >수정</button>
                                            <button 
                                                className="text-sm w-16 h-7 bg-[#e02626] text-white cursor-pointer ml-3"
                                                onClick={()=>delHandler(inquiry.id as string)}
                                            >삭제</button>
                                        </div> 
                                    }
                                </li>
                            ))
                        )
                    :
                        (
                            <p className="text-center">게시글이 존재하지 않습니다.</p>
                        )
                    
                }
            </ul>

            <button
                onClick={onWriteRoute}
                className="flex items-center justify-center ml-auto mt-6 w-16 h-7 text-sm bg-black text-white cursor-pointer font-medium"
            >등록</button>

        </div>
    )
}
