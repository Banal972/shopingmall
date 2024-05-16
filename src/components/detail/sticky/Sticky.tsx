import { useState } from "react";
import { CardType } from "../../main/Card";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../../store/feature/cart/cart";
import { useNavigate } from "react-router-dom";

export default function Sticky({docId,detail} : {docId : string,detail : CardType}) {

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
                id : docId,
                size  : clickSize,
                amount : amount,
            }

            const rs = cart.findIndex(el=>{ // 데이터가 존재하는지 여부 가져오기
                return el.id === docId && el.size === clickSize;
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

    return (
        <div className="flex-[0.6] sticky top-32">

            <h2 className="font-semibold text-4xl">
                {detail?.name}
            </h2>

            <p className="mt-6 text-2xl font-medium">
                {
                    detail.sale ?
                    <>
                        <span className="line-through text-xl">{detail.price.toLocaleString('ko-KR')}</span> 
                        <span className="ml-3 text-red-500">
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
                
                <dl className="grid grid-cols-[90px_1fr]">
                    <dt className="text-base whitespace-nowrap font-medium flex-none">상품내용</dt>
                    <dd className="text-sm leading-5">
                        {detail?.description}
                    </dd>
                </dl>

                <dl className="mt-8 grid grid-cols-[90px_1fr] items-center">
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

                <dl className="mt-8 text-center grid grid-cols-[90px_1fr] items-center">
                    <dt className="text-base whitespace-nowrap font-medium flex-none text-left">수량</dt>
                    <dd className="text-sm leading-5 flex">
                        <button 
                            onClick={increaseHanlder} 
                            className="bg-white border border-[#666] w-7 h-7 cursor-pointer rounded-sm"
                        >+</button>
                        <input 
                            className="w-24 border border-[#666] flex items-center justify-center mx-2 text-lg rounded-sm text-center" 
                            type="text" 
                            defaultValue={amount}
                        />
                        <button
                            onClick={subtractHanlder}
                            className="bg-white border border-[#666] w-7 h-7 cursor-pointer rounded-sm"
                        >-</button>
                    </dd>
                </dl>

            </div>

            <ul>
                <li className="text-center text-base border text-white border-[#000] bg-[#000] py-2 cursor-pointer rounded font-bold" onClick={cartClickHanlder}>장바구니</li>
                <li className="text-center text-base border border-[#e9e9e9] bg-[#e9e9e9] py-2 cursor-pointer rounded font-bold mt-4" onClick={()=>{}}>구매하기</li>
            </ul>

        </div>
    )
}
