import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Complete() {
    return (
        <div className="py-40">
            <div className="max-w-[1280px] w-[95%] mx-auto">

                <div className="text-center">
                    <div className="text-[62px]"><BsBoxSeam className="mx-auto"/></div>
                    <h4 className="font-medium mt-4 text-base">결제가 완료되었습니다.</h4>
                </div>

                <ul className="border-t-2 border-t-[#000] mt-28">
                    <li>
                        <div className="flex py-4 items-start">
                            <div className="w-[185px] h-[185px] relative">
                                <img 
                                    className="absolute left-0 top-0 w-full h-full object-cover"
                                    src="http://via.placeholder.com/640x480" 
                                    alt="" 
                                />
                            </div>
                            <div className="text-sm p-4">
                                <div className="bg-[#cf2f2f] text-white inline-block py-[2.5px] px-[5px] mb-4">SALE</div>
                                <p className="text-lg mb-4 font-bold">ㅁㅇㅁ</p>
                                <p className="text-[#555]">└ 신발 사이즈 - 0</p>
                                <p className="text-[#555] mt-1">└ 가격 - 0원</p>
                            </div>
                        </div>
                        <div className="py-4 border-t border-t-[#eee]">
                            <p 
                                className="flex justify-between text-[#555]"
                            >구매 갯수 : 0개 <span className="text-black font-medium">0 원</span> 
                            </p>
                            <p 
                                className="flex justify-between text-[#555] mt-5"
                            > 할인율 : <span className="text-black font-medium">0%</span> </p>
                            <p 
                                className="flex justify-between text-black text-lg mt-5"
                            >
                                결제금액 
                                <span className="font-bold text-[#cf2f2f]">
                                    <i className="line-through font-normal text-sm text-[#555]">0</i> 0원
                                </span> 
                            </p>
                        </div>
                    </li>
                    <li className="border-t border-t-[#eee] pt-4 mt-4">
                        <div className="flex py-4 items-start">
                            <div className="w-[185px] h-[185px] relative">
                                <img 
                                    className="absolute left-0 top-0 w-full h-full object-cover"
                                    src="http://via.placeholder.com/640x480" 
                                    alt="" 
                                />
                            </div>
                            <div className="text-sm p-4">
                                <div className="bg-[#cf2f2f] text-white inline-block py-[2.5px] px-[5px] mb-4">SALE</div>
                                <p className="text-lg mb-4 font-bold">ㅁㅇㅁ</p>
                                <p className="text-[#555]">└ 신발 사이즈 - 0</p>
                                <p className="text-[#555] mt-1">└ 가격 - 0원</p>
                            </div>
                        </div>
                        <div className="py-4 border-t border-t-[#eee]">
                            <p 
                                className="flex justify-between text-[#555]"
                            >구매 갯수 : 0개 <span className="text-black font-medium">0 원</span> 
                            </p>
                            <p 
                                className="flex justify-between text-[#555] mt-5"
                            > 할인율 : <span className="text-black font-medium">0%</span> </p>
                            <p 
                                className="flex justify-between text-black text-lg mt-5"
                            >
                                결제금액 
                                <span className="font-bold text-[#cf2f2f]">
                                    <i className="line-through font-normal text-sm text-[#555]">0</i> 0원
                                </span> 
                            </p>
                        </div>
                    </li>
                </ul>

                <p className="mt-12 text-lg font-bold">배송비 <span className="ml-6">0 원</span></p>
                <p className="text-xl font-bold mt-5">총 결제금액 <span className="ml-6">0 원</span></p>

                <div className="text-center mt-[85px] text-base flex justify-center">
                    <Link 
                        className='bg-[#2fb7cf] text-white w-[150px] flex items-center justify-center py-[10px] box-border'
                        to={'/history'}
                    >주문내역</Link>
                    <Link 
                        className='w-[150px] flex items-center justify-center py-[10px] box-border ml-6 border border-black bg-white text-black' 
                        to={'/'}
                    >돌아가기</Link>
                </div>

            </div>
        </div>
    )
}