import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SaleCalc from "../../common/Sales";
import { toNumber } from "../../../lib/saleCalc";

export default function Popular({name,id,src,description,sale,price} : any) {

    const navigate = useNavigate();

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
                <SwiperSlide className="cursor-pointer" onClick={()=>{ navigate(`/detail/${id}`);}}>
                    <div className="relative overflow-hidden rounded-md after:block after:pb-[calc(400/265*100%)]">
                        <div className={`absolute left-0 top-0 w-full h-full bg-no-repeat bg-center bg-[length:auto_100%] bg-[url(${src})]`}></div>
                    </div>
                    <div className="text-lg pt-4">
                        <h2 className="font-bold text-inherit">
                            {name}
                        </h2>
                        <p className="text-lg mt-2">
                            {
                                sale ? 
                                    <SaleCalc 
                                        sale={sale} 
                                        price={price} 
                                    />
                                :
                                toNumber(price as number)+"원"
                            }
                        </p>
                        <p className="des">
                            {description}
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
            <button className="right-0 translate-x-full -translate-y-1/2 text-4xl absolute z-10 cursor-default"><AiOutlineRight/></button>
        </div>
    </div>
  )
}
