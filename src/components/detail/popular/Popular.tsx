import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Card, { CardType } from "../../main/Card";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Popular({name} : any) {
    
    /* 
    // 랜덤 신발
    const [rShoes,setRShoes] = useState<ProductType[] | null>(null);
    useEffect(()=>{

        if(id){

            let rendom :ProductType[] = [];

            const filter = productData.filter(e=>e.id !== Number(id));

            for(let i= 0; i < 8; i++){
                let randomNum = Math.floor(Math.random()* filter.length);
                if(!rendom.includes(productData[randomNum])){ // 중복제거
                    rendom.push(productData[randomNum]);
                }
            }

            setRShoes(rendom);

        }

    },[productData,id]); 
    */

    const [popular,setPopular] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            limit(8)
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

        setPopular(shoes);

    }

    useEffect(()=>{
        fetch();
    },[]);

    return (
        <div className="mt-5">
            <dl>
                <dt className="text-base font-bold">비슷한 상품</dt>
                <dd className="text-sm text-[#555] mt-1 leading-5 break-keep">{name} 과 관련된 비슷한 상품도 보고 가세요.</dd>
            </dl>
            <div className="flex items-center mt-6 relative">
                <button className="left-0 -translate-x-full -translate-y-1/2 text-4xl absolute z-10 cursor-default"><AiOutlineLeft/></button>
                <Swiper
                    slidesPerView={2.5}
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
        </div>
    )
    
}


/* 


<SwiperSlide className="cursor-pointer" onClick={()=>{ navigate(`/detail/${el.id}`);}}>
                                <div className="relative overflow-hidden rounded-md after:block after:pb-[calc(400/265*100%)]">
                                    <div className={`absolute left-0 top-0 w-full h-full bg-no-repeat bg-center bg-[length:auto_100%] bg-[url(${el.src})]`}></div>
                                </div>
                                <div className="text-lg pt-4">
                                    <h2 className="font-bold text-inherit">
                                        {el.name}
                                    </h2>
                                    <p className="text-lg mt-2">
                                        {
                                            el.sale ? 
                                                <SaleCalc 
                                                    sale={el.sale} 
                                                    price={el.price} 
                                                />
                                            :
                                            toNumber(el.price as number)+"원"
                                        }
                                    </p>
                                    <p className="des">
                                        {el.description}
                                    </p>
                                </div>
                            </SwiperSlide>


*/