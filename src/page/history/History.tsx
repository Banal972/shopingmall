import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { auth, db } from "../../firebase";
import moment from "moment";
import { saleCalc, toNumber } from "../../lib/saleCalc";
import { HistoryType } from "../../@types/history";

function History() {

    const [history,setHistory] = useState<HistoryType[]>([]);
    const user = auth.currentUser;
    
    const fetch = async ()=>{

        const fetchQuery = query(
            collection(db,"history"),
            where("userId","==",user?.uid)
        );

        const snapshot = await getDocs(fetchQuery);

        const history = snapshot.docs.map((doc)=>{

            const {product,created} = doc.data();
            return {
                product,
                created,
                id : doc.id
            };

        });

        setHistory(history);

    }

    useEffect(()=>{
        fetch();
    },[user]);

    return (
        <div className="pt-20">
            <div className="max-w-[1480px] w-[95%] mx-auto pt-24 pb-32">
                
            <h2 className="text-4xl text-center font-bold mb-10">주문내역</h2>

                <ul className='border-t-2 border-t-[#000] border-b border-b-[#eee]'>
                    {
                        history.map((e,index)=>(
                            <li className={`pt-10 ${index !== 0 ? "border-t border-t-[#eee] mt-10" : ""}`} key={e.id}>
                                <p className="text-sm text-[#555]">{moment(e.created).format("YYYY-MM-DD")}</p>
                                <p className="text-sm text-[#555] mt-1">주문번호 : {e.id}</p>
                                
                                {
                                    e.product.map((item,index)=>(
                                        <div 
                                            className={`flex items-start mt-4 ${index !== 0 ? "pt-4 border-t border-t-[#ddd]" : ""}`} 
                                            key={index}
                                        >
                                            <div className="w-[200px] h-[200px] rounded relative">
                                                <img className="absolute left-0 top-0 w-full h-full object-cover" src={item.src} alt={item.name}/>
                                            </div>
                                            <div className="text-sm p-4 text-[#555]">
                                                <p>{item.name}</p>
                                                <p className="mt-2">사이즈 : {item.size}</p>
                                                <p className="mt-2">갯수 : {item.amount} 개</p>
                                                {
                                                    item.sale !== 0 
                                                    ?
                                                        <p 
                                                            className="mt-2 text-base font-bold text-[#333] flex gap-2 items-center"
                                                        >
                                                            <span className="text-[#999] text-xs line-through">{toNumber(item.price * item.amount)}</span>
                                                            {toNumber(saleCalc(item.sale,item.price) * item.amount)} 원
                                                        </p>
                                                    :
                                                        <p className="mt-2 text-base font-bold text-[#333]">{toNumber(item.price * item.amount)} 원</p>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }

                                <Link 
                                    to={`more/${e.id}`} 
                                    className='flex items-center justify-center mt-6 bg-black text-white rounded text-center h-10 text-sm'
                                >상세 정보</Link>
                                
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    )
}

export default History