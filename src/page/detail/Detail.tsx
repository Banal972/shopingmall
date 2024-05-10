import { useParams } from "react-router-dom";
import Popular from "../../components/detail/popular/Popular";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { CardType } from "../../components/main/Card";

export default function Detail() {

    const {id} = useParams();
    const [detail,setDetail] = useState<CardType>();

    const fetch = async()=>{

        console.log(id);

        const detailQuery = await getDoc(doc(db, "shoes", String(id)))

        setDetail(detailQuery.data());

    }

    useEffect(()=>{
        fetch();
    },[id]);


  return (
    <div className="pt-20">

        <div className="max-w-[1480px] w-[90%] mx-auto flex relative items-start pt-24 pb-40 gap-x-16">

            <div className="flex-1 min-w-0 box-border">

                <div className="box-border p-0">
                    <div className="max-w-[450px] mx-auto">
                        <div className={`bg-no-repeat bg-center bg-cover border border-[#ddd] rounded-md overflow-hidden after:block after:pb-[100%] relative`}>
                            <img src={detail?.src} alt={detail?.name} className="absolute left-0 top-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div className="mt-12">

                    <ul className="flex">
                        {/* border-bottom: 0; border-width: 2px; border-color: #000; */}
                        {/* 
                            &:not(.active){
                                border: 0; border-top: 1px solid #ddd; border-bottom: 2px solid #000;
                            }
                         */}
                        <li className={"w-3/12 text-base border border-[#464646] text-center p-3 cursor-pointer border-b-2 border-b-[#000] border-r-[#e6e6e6]"}>상세정보</li>
                        <li className={"w-3/12 text-base border border-[#464646] text-center p-3 cursor-pointer border-b-2 border-b-[#000]"}>상품후기</li>
                        {/* <li className={taplist ? "active" : undefined} onClick={()=>setTaplist(true)} >상세정보</li>
                        <li className={!taplist ? "active" : undefined} onClick={()=>setTaplist(false)} >상품후기</li> */}
                        <li></li>
                        <li></li>
                    </ul>

                    {/* {
                        taplist === true 
                        ? 
                            <div className="cont" dangerouslySetInnerHTML={{__html : shoes.detail as string}}></div>
                        : 
                            <Inquiry user={userData}/>
                    } */}
                    
                    <div className="cont">{detail?.detail}</div>

                </div>

                <Popular/>

            </div>

            <div className="flex-[0.6] sticky top-32">

                <h2 className="font-semibold text-4xl">
                    {detail?.name}
                </h2>

                <p className="mt-6 text-2xl font-medium">

                    {/* 
                        span:not(.p-no) {
                            text-decoration: line-through; font-size: 20/28*1em;
                        }

                        .p-no {
                            margin-left: 10px; color: #e02626;
                        }
                    */}

                    {/* {
                        shoes &&
                        shoes.sale ?
                        <>
                            <span>{shoes.price.toLocaleString('ko-KR')}</span> 
                            <span className="p-no">
                                { (shoes.price - (shoes.price * shoes.sale / 100)).toLocaleString("ko-KR") }원
                            </span>
                        </>
                        :
                        <>
                            { shoes.price.toLocaleString('ko-KR') } 원
                        </>
                    } */}
                </p>

                <div className="mt-6 py-6 border border-[#000] border-l-0 border-r-0">
                    
                    <dl className="flex">
                        <dt className="text-base whitespace-nowrap mr-2 font-medium flex-none">상품내용</dt>
                        <dd className="text-sm leading-5">
                            {detail?.description}
                        </dd>
                    </dl>

                    <dl className="mt-6">
                        <dt className="text-base whitespace-nowrap mr-2 font-medium flex-none">신발 사이즈</dt>
                        <dd className="text-sm leading-5 flex gap-1">
                            {/* background: #000; color: #fff; */}
                            {
                                detail?.size?.map((el)=>
                                    <button key={el} className="bg-white text-[#666] border border-[#666] inline-block cursor-pointer text-xs rounded-sm py-1 px-2"> 
                                        {el}
                                    </button>
                                )
                            }

                            {/* {
                                size.map((elm,i)=>(
                                    <button 
                                        onClick={(e)=>{
                                            setSize(elm);
                                        }} 
                                        className={elm === size ? 'active' : undefined} 
                                        key={i}
                                    > 
                                        {String(elm)} 
                                    </button>
                                ))
                            } */}
                        </dd>
                    </dl>

                    <dl className="mt-6 text-center">
                        <dt className="text-base whitespace-nowrap mr-2 font-medium flex-none">수량</dt>
                        <dd className="text-sm leading-5 flex">
                            <button className="bg-white border border-[#666] w-7 h-7 cursor-pointer rounded-sm">+</button>
                            <input className="w-24 border border-[#666] flex items-center justify-center mx-2 text-lg rounded-sm text-center" type="text" />
                            <button className="bg-white border border-[#666] w-7 h-7 cursor-pointer rounded-sm">-</button>
                            {/* <button
                                onClick={()=>{
                                    setAmount(amount+1);
                                }}
                            >+</button>
                            <input type="text" className="num" value={amount} onChange={(e)=>{setAmount(Number(e.target.value))}} />
                            <button
                                onClick={()=>{
                                    if(amount <= 1){
                                        return;
                                    }
                                    setAmount(amount-1);
                                }}
                            >-</button> */}
                        </dd>
                    </dl>

                </div>

                <ul>
                    <li className="text-center text-base border text-white border-[#000] bg-[#000] px-4 cursor-pointer rounded font-bold" onClick={()=>{}}>장바구니</li>
                    <li className="text-center text-base border border-[#e9e9e9] bg-[#e9e9e9] px-4 cursor-pointer rounded font-bold mt-6" onClick={()=>{}}>구매하기</li>
                </ul>

            </div>

        </div>

    </div>
  )
}
