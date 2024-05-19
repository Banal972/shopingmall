import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper,SwiperSlide } from "swiper/react";
import { CardType } from "../../common/Card/Card";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Only() {

    const [] = useState([]);

    const [only,setOnly] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where("only","==",true),
            limit(5)
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

        setOnly(shoes);

    }

    useEffect(()=>{
        fetch();
    },[]);

  return (
    <section className="mt-24">
        <div className="w-[95%] mx-auto max-w-[1600px]">
            <div className="flex">
                <div className="flex-1 flex flex-col justify-between">

                    <dl>
                        <dt className="text-lg font-normal text-gray-900">
                            PROMOTION
                        </dt>
                        <dd className="text-5xl font-bold mt-11">
                            단독 상품
                        </dd>
                    </dl>

                    <div className="flex items-center">
                        <button className="text-5xl cursor-pointer flex items-center"><AiOutlineLeft/></button>
                        <button className="text-5xl cursor-pointer flex items-center ml-4"><AiOutlineRight/></button>
                    </div>

                </div>

                <Swiper className="flex-[3.5] ml-12"
                    modules={[Navigation,Pagination,Autoplay]}
                    slidesPerView={1.5}
                    spaceBetween={20}
                    loop
                    breakpoints={{
                        480 : {
                            slidesPerView :2.5,
                            spaceBetween :20
                        },
                        820 : {
                            slidesPerView :2.5,
                            spaceBetween : 20
                        },
                        1280 : {
                            slidesPerView :2.5,
                            spaceBetween : 40
                        }
                    }}
                    speed={600}
                    autoplay={{
                        delay : 3000,
                        disableOnInteraction : false
                    }}
                    navigation={{
                        prevEl : ".slideBtn .prev",
                        nextEl : ".slideBtn .next"
                    }}
                    pagination={{
                        el : ".s2 .slidePage",
                        type : "progressbar",
                        renderProgressbar : function(progressbarFillClass){
                            return `<span class="${progressbarFillClass} bar"></span>`;
                        }
                    }}
                >
                    {
                        only.map((el)=>
                            <SwiperSlide onClick={()=>{}}>
                                <div className="relative overflow-hidden border-gray-600 box-border after:pb-[100%] after:block">
                                    <div className="absolute left-0 top-0 w-full h-full">
                                        <img className="absolute top-0 left-0 w-full h-full object-cover object-center" src={el.src} alt={el.name} />
                                    </div>
                                </div>
                                <div className="text-[18px] pt-5">
                                    <h2 className="font-bold text-lg">
                                        {el.name}
                                    </h2>
                                    <p className="text-lg mt-2 font-medium">{el.price}원</p>
                                </div>
                            </SwiperSlide>
                        )
                    }
                    
                </Swiper>

            </div>

            <div className="w-full h-1 bg-black relative mt-12">
                <span className="absolute left-0 top-0 w-full h-full bg-black"></span>
            </div>
        </div>
    </section>
  )
}
