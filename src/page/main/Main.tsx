import { useRef } from "react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../components/main/Card";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSwapRight } from "react-icons/ai";

export default function Main() {

    const paginationRef = useRef(null);

  return (
    <main>
        <section className="mx-auto relative">
            <Swiper
                speed={600}
                loop={true}
                parallax={true}
                modules={[Parallax,Pagination,Autoplay]}
                autoplay={{
                  delay : 5000,
                  disableOnInteraction : false
                }}
                pagination={{
                  el : paginationRef.current,
                  clickable : true,
                  renderBullet : function(_,className:string) :string {
                    return `<li className="h-[2px] bg-white flex-1 gap-7 opacity-50 relative ${className}">
                                <div className="w-full left-0 top-0 h-full bg-white absolute"></div>
                            </li>`;
                  }
                }}
            >
                <SwiperSlide>
                    <div className="h-[600px] relative" data-swiper-parallax="70%">
                        <img src="https://placehold.co/600x400" className="absolute left-0 top-0 w-full h-full object-cover object-center"></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="h-[600px] relative">
                    <div className="h-[600px] relative">
                        <img src="https://placehold.co/600x400" className="absolute left-0 top-0 w-full h-full object-cover object-center"></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="h-[600px] relative">
                    <div className="h-[600px] relative">
                        <img src="https://placehold.co/600x400" className="absolute left-0 top-0 w-full h-full object-cover object-center"></img>
                    </div>
                </SwiperSlide>
            </Swiper>

            <ul ref={paginationRef} className="absolute left-1/2 -translate-x-1/2 z-10 w-4/5 bottom-12 flex max-w-[450px]">
                <li className="h-[2px] bg-white flex-1 gap-7 opacity-50 relative">
                    <div className="w-full left-0 top-0 h-full bg-white absolute"></div>
                </li>
            </ul>
        </section>

        <section className="mt-[100px]">
            <div className="max-w-[1600px] w-[95%] mx-auto flex items-start gap-10">

                <h2 className="mr-12 sticky top-[calc((30+75)*1px)] text-3xl font-bold leading-normal whitespace-nowrap">
                    지금 가장<br/>
                    주목해야 할 인기상품
                </h2>
                
                <div className="grid grid-cols-5 gap-5 flex-1">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </section>

        <div className="bg-black h-[450px] mt-24 relative overflow-hidden bg-[url(/asset/image/main/banner01.jpg)] bg-[center bottom] bg-fixed before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:opacity-50 z-10">
            <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase text-3xl z-20 w-full text-center text-white">It's new and Comfortable</h2>
        </div>

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
                        <SwiperSlide onClick={()=>{}}>
                            <div className="relative overflow-hidden border-gray-600 box-border after:pb-[100%] after:block">
                                <div className="absolute left-0 top-0 w-full h-full">
                                    <img className="absolute top-0 left-0 w-full h-full object-cover object-center" src="https://placehold.co/600x400" alt="" />
                                </div>
                            </div>
                            <div className="text-[18px] pt-5">
                                <h2 className="font-bold text-lg">
                                    이름
                                </h2>
                                <p className="text-lg mt-2 font-medium">500000원</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide onClick={()=>{}}>
                            <div className="relative overflow-hidden border-gray-600 box-border after:pb-[100%] after:block">
                                <div className="absolute left-0 top-0 w-full h-full">
                                    <img className="absolute top-0 left-0 w-full h-full object-cover object-center" src="https://placehold.co/600x400" alt="" />
                                </div>
                            </div>
                            <div className="text-[18px] pt-5">
                                <h2 className="font-bold text-lg">
                                    이름
                                </h2>
                                <p className="text-lg mt-2 font-medium">500000원</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide onClick={()=>{}}>
                            <div className="relative overflow-hidden border-gray-600 box-border after:pb-[100%] after:block">
                                <div className="absolute left-0 top-0 w-full h-full">
                                    <img className="absolute top-0 left-0 w-full h-full object-cover object-center" src="https://placehold.co/600x400" alt="" />
                                </div>
                            </div>
                            <div className="text-[18px] pt-5">
                                <h2 className="font-bold text-lg">
                                    이름
                                </h2>
                                <p className="text-lg mt-2 font-medium">500000원</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>

                <div className="w-full h-1 bg-black relative mt-12">
                    <span className="absolute left-0 top-0 w-full h-full bg-black"></span>
                </div>
            </div>
        </section>

        <section className="mt-[100px] mb-[100px]">
            <div className="max-w-[1600px] w-[95%] mx-auto">
                <div className="flex items-start">
                    <div className="grid grid-cols-5 flex-[1.5] mr-10 gap-5">
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                    <div className="flex-[0.8] max-w-[450px] bg-black sticky top-[calc(30px+75px)] after:block after:pb-[calc(750/500*100%)] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:opacity-50">
                        <img className="absolute top-0 left-0 w-full h-full object-cover" src="/asset/image/main/banner02.jpg" alt="세일 배너" />
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

    </main>
  )
}
