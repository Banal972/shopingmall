import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartAtom } from "../../../store/feature/cart/cart";
import { useNavigate } from "react-router-dom";
import { buyAtom } from "../../../store/feature/buy/buy";
import { DetailType } from "../../../@types/card";

const dlstyle = "flex flex-col gap-3 lg:grid grid-cols-[90px_1fr] lg:items-center";

export default function Sticky({detail} : {detail : DetailType}) {

    const navigate = useNavigate();

    // 사이즈 선택
    const [clickSize,setClickSize] = useState(0);
    const sizeClickHandler = (event : number)=>{
        setClickSize(event);
    }

    // 갯수 선택
    const [amount,setAmount] = useState(1);
    const increaseHanlder = ()=>{
        setAmount(amount+1);
    }
    const subtractHanlder = ()=>{
        if(amount <= 1){
            return;
        }
        setAmount(amount-1);
    }

    // 장바구니 추가기능
    const [cart,setCart] = useRecoilState(cartAtom);
    const cartClickHanlder = ()=>{

        if(!detail) return alert('오류가 발생했습니다.');
        if(clickSize === 0) return alert('사이즈를 선택해주세요.');

        if(detail){ // shoes가 존재하면

            const data = {
                product : detail,
                id : detail.id,
                size  : clickSize,
                amount : amount,
            }

            const rs = cart.findIndex(el=>{ // 데이터가 존재하는지 여부 가져오기
                return el.id === detail.id && el.size === clickSize;
            }); 

            if(rs > -1){
                setCart((prev)=>{
                    const cart = [...prev]; // 예전 데이터 가져오고
                    cart[rs].amount++;  // 해당순서의 amount을 1 더해줍니다.
                    return cart; // 그리고 다시 넣어주기
                })
            }else{
                setCart((prev)=>[...prev, data]);
            }

            if(window.confirm("장바구니로 이동하시겠습니까?")){
                navigate('/cart');
            }else {
                return;
            }

        }

    }

    // 구매하기
    const setBuy = useSetRecoilState(buyAtom);
    const buyClickHandler = ()=>{
        if(clickSize === 0){
            return alert('사이즈를 선택해주세요');
        }
        
        if(confirm(`${detail.name}의 \n${clickSize}사이즈 수량 \n${amount}개를 구매하시겠습니까?`)){

            const data = {
                product : detail,
                id : detail.id,
                size  : clickSize,
                amount : amount
            }

            setBuy([data]);
            navigate('/buy');

        }

    }

    return (
        
        <div className="flex-[0.6] md:sticky top-32">

            <h2 className="font-semibold text-2xl lg:text-4xl">
                {detail?.name}
            </h2>

            <p className="mt-6 text-xl lg:text-2xl font-medium">
                {
                    detail.sale ?
                    <>
                        <span 
                            className="line-through text-xl"
                        >
                            {detail.price.toLocaleString('ko-KR')}
                        </span> 
                        <span 
                            className="ml-3 text-red-500"
                        >
                            { (detail.price - (detail.price * detail.sale / 100)).toLocaleString("ko-KR") }원
                        </span>
                    </>
                    :
                    <>
                        { detail.price.toLocaleString('ko-KR') }원
                    </>
                }
            </p>

            <div className="mt-8 py-12 border border-[#000] border-l-0 border-r-0">
                
                <dl className={dlstyle}>
                    <dt className="text-base whitespace-nowrap font-medium flex-none">상품내용</dt>
                    <dd className="text-sm leading-5">
                        {detail?.description}
                    </dd>
                </dl>

                <dl className={`${dlstyle} mt-8`}>
                    <dt className="text-base whitespace-nowrap font-medium flex-none">신발 사이즈</dt>
                    <dd className="text-sm leading-5 flex gap-1">
                        {
                            detail?.size?.map((el)=>
                                <button 
                                    key={el} 
                                    onClick={()=>sizeClickHandler(el)}
                                    className={`border border-[#666] inline-block cursor-pointer text-xs rounded-sm py-1 px-2 ${clickSize === el ? "bg-black text-white" : "bg-white text-[#666]"}`}
                                >{el}</button>
                            )
                        }
                    </dd>
                </dl>

                <dl className={`${dlstyle} mt-8`}>
                    <dt className="text-base whitespace-nowrap font-medium flex-none text-left">수량</dt>
                    <dd className="text-sm leading-5 flex border border-[#666] justify-between w-40">
                        <button 
                            onClick={increaseHanlder} 
                            className="w-7 h-7 cursor-pointer"
                        >+</button>
                        <div className="flex items-center justify-center mx-2 text-lg rounded-sm text-center">{amount}</div>
                        <button
                            onClick={subtractHanlder}
                            className="w-7 h-7 cursor-pointer"
                        >-</button>
                    </dd>
                </dl>

                <dl className={`${dlstyle} mt-8`}>
                    <dt className="text-base whitespace-nowrap font-medium flex-none text-left">배송</dt>
                    <dd className="text-sm leading-5 flex">
                        무료배송
                    </dd>
                </dl>

            </div>

            <ul>
                <li className="text-center text-base border text-white border-[#000] bg-[#000] py-2 cursor-pointer rounded font-bold" onClick={cartClickHanlder}>장바구니</li>
                <li className="text-center text-base border border-[#e9e9e9] bg-[#e9e9e9] py-2 cursor-pointer rounded font-bold mt-4" onClick={buyClickHandler}>구매하기</li>
            </ul>

        </div>
    )
}
