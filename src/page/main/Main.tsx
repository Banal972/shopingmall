import { useRef } from "react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Popular from "../../components/main/Popular/Popular";
import Only from "../../components/main/Only/Only";
import Sale from "../../components/main/Sale/Sale";

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
                {
                    [
                        '/asset/image/main/visual/visual01.jpg',
                        '/asset/image/main/visual/visual02.jpg',
                        '/asset/image/main/visual/visual03.jpg'
                    ].map((item,index)=>(
                        <SwiperSlide key={index} className="overflow-hidden">
                            <div className="h-[300px] md:h-[600px] relative" data-swiper-parallax="50%">
                                <img 
                                    src={item} alt="비주얼 사진" 
                                    className="absolute left-0 top-0 w-full h-full object-cover object-center"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <ul ref={paginationRef} className="absolute left-1/2 -translate-x-1/2 z-10 w-4/5 bottom-12 flex max-w-[450px]">
                <li className="h-[2px] bg-white flex-1 gap-7 opacity-50 relative">
                    <div className="w-full left-0 top-0 h-full bg-white absolute"></div>
                </li>
            </ul>
        </section>
        <Popular/>
        <div 
            className="bg-black mt-24 relative overflow-hidden bg-[url(/asset/image/main/banner/banner01.jpg)] bg-[center bottom] bg-fixed before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:opacity-50 z-10 h-[250px] md:h-[450px]"
        >
            <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase text-2xl md:text-3xl z-20 w-full text-center text-white">It's new and Comfortable</h2>
        </div>
        <Only/>
        <Sale/>
    </main>
  )
}
