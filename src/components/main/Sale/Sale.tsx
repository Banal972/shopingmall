import { useEffect, useState } from "react";
import Card, { CardType } from "../../common/Card/Card";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { AiOutlineSwapRight } from "react-icons/ai";

export default function Sale() {

    const [sale,setSale] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where("sale",">",0),
            limit(10)
        );

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc)=>{

            const {price,description,name,src} : CardType = doc.data();

            return {
                price,
                description,
                name,
                src,
                id : doc.id
            }

        });

        setSale(shoes);

    }

    useEffect(()=>{
        fetch();
    },[]);

  return (
    <section className="mt-[100px] mb-[100px]">
        <div className="max-w-[1600px] w-[95%] mx-auto">
            <div className="flex items-start">
                <div className="grid grid-cols-5 flex-[1.5] mr-10 gap-5">
                    {
                        sale.length > 0 ? sale.map((el)=><Card key={el.id} {...el}/>) : <p>현재 할인되는 상품이 없습니다.</p>
                    }
                </div>
                <div className="flex-[0.8] max-w-[450px] bg-black sticky top-[calc(30px+75px)] after:block after:pb-[calc(750/500*100%)] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:opacity-50">
                    <img className="absolute top-0 left-0 w-full h-full object-cover" src="/asset/image/main/banner/banner02.jpg" alt="세일 배너" />
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        <dl className="text-center">
                            <dt className="text-4xl font-bold">
                                SALE
                            </dt>
                            <dd className="text-lg mt-4">
                                최대 30% 할인
                            </dd>
                        </dl>
                        <div className="w-[calc(155/16em)] h-[calc(45/16*1em)] text-base flex items-center justify-center border-white mt-6 box-border cursor-pointer transition-[background,color] hover:bg-white hover:text-black" onClick={()=>{}}>
                            더보기 <AiOutlineSwapRight className="ml-1 text-lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
