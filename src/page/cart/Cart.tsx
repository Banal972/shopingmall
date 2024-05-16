import { IoIosCheckmark } from "react-icons/io";
import { cartAtom } from "../../store/feature/cart/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { toNumber } from "../../lib/saleCalc";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Buy from "../../components/cart/Buy";
import Remove from "../../components/cart/Remove";
import Add from "../../components/cart/Add";
import Delete from "../../components/cart/Delete";
import Sale from "../../components/cart/Sale";

export default function Cart() {

    const cart = useRecoilValue(cartAtom);

    // 총액
    const [total,setTotal] = useState(0);
    // 총액계산
    useEffect(()=>{

        let allPrice = 0;

        cart.forEach((elm)=>{
            elm.product.sale ? 
                allPrice += (elm.product.price - (elm.product.price * elm.product.sale/100)) * elm.amount
            :
                allPrice += elm.product.price * elm.amount;
            }
        );

        setTotal(allPrice);

    },[cart]);


    // 선택된 아이템
    const [checkItem,setCheckItem] = useState<string[]>([]);

    // 단일 선택
    const handleSingleCheck = (id : string) => {

        console.log(id);

        if(!checkItem.includes(id)){
        // 단일 선택시 아이템 추가
            setCheckItem(prev=>[...prev,id]);
        }else {
        // 단일 선택 해제 시 체크된 아이템 제외
            setCheckItem(checkItem.filter(el=>el !== id));
        }

    }

    const [allCheck,setAllCheck] = useState(false);
    // 체크박스 전체 선택
    useEffect(()=>{

        if(allCheck){
            const idArray : string[] = [];
            cart.forEach((el)=> idArray.push(`${el.id}${el.size}`));
            setCheckItem(idArray);
        }else{
            setCheckItem([]);
        }

    },[allCheck]);

    return (
        <div className="pt-20">
            <div className="max-w-[1600px] w-[90%] mx-auto relative py-20">
        
                <h2 className="text-4xl text-center font-bold mb-10">장바구니</h2>

                <div className="border-t-2 border-t-[#000] border-b border-b-[#ddd]">

                    <div className="grid grid-cols-[50px_auto_10%_10%_10%] items-center text-center">

                        <div className="p-4 box-border">
                        
                            <div className="w-full">
                                {/* bg-[#26a8e0] text-white border border-[#26a8e0] */}
                                <div 
                                    className={`w-4 h-4 border border-[#ddd] relative cursor-pointer box-border mx-auto ${allCheck ? "bg-[#26a8e0] text-white border border-[#26a8e0]" : ""}`}
                                    onClick={()=>setAllCheck(!allCheck)}
                                >
                                    <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                </div>
                            </div>

                        </div>
                        
                        <div className="p-4 box-border">상품명</div>
                        <div className="p-4 box-border">가격</div>
                        <div className="p-4 box-border">수량</div>
                        <div className="p-4 box-border">삭제</div>

                    </div>

                    {
                        cart.length > 0 ?
                            cart.map((elm,index)=>(
                                <div 
                                    className={`border-t border-t-[#ddd] grid grid-cols-[50px_auto_10%_10%_10%] items-center text-center ${index === 0 ? "border-t border-t-[#ddd]" : ""}`} 
                                    key={elm.id}
                                >
                                    <div className="p-4 box-border">
                                        <div 
                                            className={`w-4 h-4 border border-[#ddd] relative cursor-pointer box-border mx-auto ${checkItem.includes(elm.id as string) ? "bg-[#26a8e0] text-white border border-[#26a8e0]" : ""}`}
                                            onClick={()=>handleSingleCheck(elm.id as string)}
                                        >
                                            <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                        </div>
                                    </div>

                                    <div className="p-4 box-border">
                                        <div className="flex items-center">
                                            <div 
                                                className="bg-no-repeat bg-cover bg-center w-36 h-36 rounded-md border border-[#ddd]" 
                                                style={{backgroundImage:`url(${elm.product.src})`}}
                                            />
                                            <div className="ml-5 text-left">
                                                <dl>
                                                    <dt className="text-base font-bold">{elm.product.name}</dt>
                                                    <dd className="text-xs text-[#555] mt-1">사이즈 : {elm.size}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 box-border flex items-center">
                                        {
                                            elm.product.sale 
                                            ?
                                                <div>
                                                    <p className="text-sm line-through text-[#999] text-nowrap">
                                                        {toNumber(elm.product.price as number)}원
                                                    </p>
                                                    <p className="font-bold text-nowrap">
                                                        <Sale price={elm.product.price} sale={elm.product.sale} />
                                                    </p>
                                                </div> 
                                            :
                                                <p className="font-bold text-nowrap">
                                                    {toNumber(elm.product.price as number)}원
                                                </p>
                                        }
                                    </div>

                                    <div className="p-4 box-border">
                                        <div className="flex gap-2 border border-[#ddd]">
                                            <Add elm={elm}/>
                                            <div className="flex-1 ">{elm.amount}</div>
                                            <Delete elm={elm}/>
                                        </div>
                                    </div>

                                    <div className="p-4 box-border">
                                        <Remove elm={elm}/>
                                    </div>

                                </div>
                            ))
                        :
                        <div className="text-left border-t border-t-[#ddd]">
                            <div className="p-4 box-border text-center grid-cols-10">상품이 존재하지 않습니다.</div>
                        </div>
                    }

                </div>

                <div className="flex items-center justify-end mt-6 text-base">
                    결제 예정금액 
                    <h2 className="ml-4">
                        <span className="text-2xl font-bold">{toNumber(total as number)}</span>원
                    </h2>
                </div>

                <Buy checkItem={checkItem}/>

            </div>
        </div>
    )
}