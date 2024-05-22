import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper,SwiperRef,SwiperSlide } from "swiper/react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { CardType } from "../../../@types/card";

const navigateStyle = "text-3xl md:text-5xl cursor-pointer flex items-center";

export default function Only() {

    const sliderRef = useRef<SwiperRef>(null);

    const [only,setOnly] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where("only","==",true),
            limit(5)
        );

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc)=>{

            const {price,description,name,src} = doc.data() as CardType;

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

    const handlePrev = ()=>{
        if(!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }

    const handleNext = ()=>{
        if(!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }

    return (
        <section className="mt-24 border-b-2 border-b-slate-300 pb-24 ">
            <div className="w-[95%] mx-auto max-w-[1600px]">
                <div className="md:flex">
                    <div className="flex-1 flex flex-col justify-between">

                        <dl>
                            <dt className="text-lg font-normal text-gray-900">
                                PROMOTION
                            </dt>
                            <dd className="text-3xl md:text-5xl font-bold mt-5 md:mt-11">
                                단독 상품
                            </dd>
                        </dl>

                        <div className="flex items-center gap-4 justify-end md:justify-start">
                            <button 
                                type="button" 
                                className={`${navigateStyle} prevBtn`}
                                onClick={handlePrev}
                            ><AiOutlineLeft/></button>
                            <button 
                                type="button" 
                                className={`${navigateStyle} nextBtn`}
                                onClick={handleNext}
                            ><AiOutlineRight/></button>
                        </div>

                    </div>

                    <Swiper 
                        ref={sliderRef}
                        className="mt-10 md:mt-0 flex-[3.5] ml-12"
                        modules={[Navigation,Pagination,Autoplay]}
                        slidesPerView={1.5}
                        spaceBetween={20}
                        loop={true}
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
                    >
                        {
                            only.map((el)=>
                                (
                                    <SwiperSlide key={el.id}>
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
                            )
                        }
                        
                    </Swiper>

                </div>
            </div>
        </section>
    )
}
