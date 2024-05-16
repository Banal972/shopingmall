import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Card, { CardType, ProductType } from "../../main/Card";
import { DocumentData, collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Popular({name,cate} : {name : string,cate : string}) {
    
    const [popular,setPopular] = useState<CardType[]>([]);

    const fetch = async ()=>{

        if(!cate || !name) return;
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where('cate','==',cate),
            where('name',"!=",name),
            limit(8)
        );

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc : DocumentData) : CardType =>{
            const {price,description,name,src,tag} : ProductType = doc.data();
            return {
                price,
                description,
                name,
                src,
                tag,
                id : doc.id
            }
        });

        setPopular(shoes);

    }

    useEffect(()=>{
        fetch();
    },[cate]);

    return (
        <div className="mt-12">
            <dl>
                <dt className="text-base font-bold">비슷한 상품</dt>
                <dd className="text-sm text-[#555] mt-1 leading-5 break-keep">{name} 과 관련된 비슷한 상품도 보고 가세요.</dd>
            </dl>
            {
                popular.length > 4 
                ?
                    <div className="flex items-center mt-6 relative">
                        <button className="left-0 -translate-x-full -translate-y-1/2 text-4xl absolute z-10 cursor-default"><AiOutlineLeft/></button>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={15}
                            modules={[Navigation,Autoplay]}
                            navigation={{
                                prevEl : '.p_slide button.prev',
                                nextEl : '.p_slide button.next'
                            }}
                            autoplay={{
                                delay : 3000,
                                disableOnInteraction : false
                            }}
                            loop
                            speed={500}
                            breakpoints={{
                                480 : {
                                    slidesPerView : 3.5,
                                    spaceBetween : 15
                                },
                                1024 : {
                                    slidesPerView : 4,
                                    spaceBetween : 25
                                }
                            }}
                        >
                            {
                                popular.map((el)=>(
                                    <SwiperSlide key={el.id}>
                                        <Card {...el} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <button className="right-0 translate-x-full -translate-y-1/2 text-4xl absolute z-10 cursor-default"><AiOutlineRight/></button>
                    </div>
                :
                    <div className="grid grid-cols-4 mt-6">
                        {
                            popular.map((el)=>(
                                <Card key={el.id} {...el} />
                            ))
                        }
                    </div>
            }
        </div>
    )
    
}