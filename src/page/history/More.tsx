import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoryMoreType } from "../../@types/history";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { toNumber } from "../../lib/saleCalc";

function More() {

  const {id} = useParams();
  const [history,setHistory] = useState<HistoryMoreType>();

  const fetch = async()=>{
      if(!id) return;
      const fetchQuery = await getDoc(doc(db, "history", String(id)));
      const data = fetchQuery.data() as HistoryMoreType;
      setHistory({
        ...data,
        id
      });
  }

  useEffect(()=>{
    fetch();
  },[id]);

  return (
    <div className='pt-20'>

      {
        history ?
          <div className="max-w-[1480px] w-[95%] mx-auto pt-24 pb-32">
          
            <h2 className="text-4xl text-center font-bold mb-10">주문상세</h2>

            <div className="border-t-2 border-t-[#000] py-5 px-2">
              <dl className="text-sm">
                <dt>주문번호 : {history.id}</dt>
                <dd className="mt-2">구매 날짜 : {moment(history.created).format("YYYY-MM-DD")}</dd>
              </dl>
            </div>

            <div className="py-5 px-2 border-t border-t-[#ddd]">

              <h4 className="text-base font-medium">주문상품 {history.product.length}개</h4>

              <ul className='list'>
                
                {
                  history.product.map((item,index)=>(
                    <li className={`mt-6 ${index !== 0 ? "pt-6 border-t border-t-[#ddd]" : ""}`}>
                  
                      <dl>
                        <dt className="text-sm font-bold">구매확정</dt>
                        <dd className="text-xs font-normal mt-1">배송완료</dd>
                      </dl>

                      <div className="flex mt-4">
                        <div className="w-[150px] h-[150px] rounded relative">
                            <img 
                              className="absolute left-0 top-0 w-full h-full object-cover" 
                              src={item.src}
                              alt={item.name} 
                            />
                        </div>
                        <dl className="px-4">
                          <dt className="font-bold">{item.name}</dt>
                          <dd className="text-sm mt-1">사이즈 - {item.size}</dd>
                          <dd className='text-sm mt-1'>
                            <span className="font-bold text-black">{toNumber(item.price)}원</span> {item.amount}개
                          </dd>
                        </dl>
                      </div>

                    </li>
                  ))
                }

              </ul>

            </div>

            <div className="py-5 px-2 border-t border-t-[#ddd]">

              <h4 className="text-base font-medium">구매자 정보</h4>

              <ul className='mt-5 text-sm text-[#555]'>
                <li className="flex"><p>주문자</p> <span className="ml-auto text-black text-right
                  leading-snug break-keep">{history.deliveryInput}</span></li>
                <li className="flex mt-3"><p>이메일</p> <span className="ml-auto text-black text-right
                  leading-snug break-keep">{history.email}</span></li>
              </ul>

            </div>

            <div className="py-5 px-2 border-t border-t-[#ddd]">
              <h4 className="text-base font-medium">배송지 정보</h4>
              <ul className='mt-5 text-sm text-[#555]'>
                <li 
                    className="flex"
                >
                    <p>받는분</p> <span className="ml-auto text-black text-right leading-snug break-keep">{history.deliveryName}</span>
                </li>
                <li 
                    className="flex mt-3"
                >
                    <p>주소</p> <span className="ml-auto text-black text-right leading-snug break-keep">{history.fullAddress}<br/>{history.addr2}</span>
                </li>
                <li 
                    className="flex mt-3"
                >
                    <p>배송 메세지</p> <span className="ml-auto text-black text-right leading-snug break-keep">{history.delivery} <br/> {history.deliveryInput}</span>
                </li>
              </ul>
            </div>

            <div className="py-5 px-2 border-t border-t-[#ddd]">
              <h4 className="text-base font-medium">결제 정보</h4>
              <ul className='mt-5 text-sm text-[#555]'>
                <li 
                    className="flex"
                >
                    <p>결제 방식</p> <span className="ml-auto text-black text-right leading-snug break-keep">{history.pay}</span></li>
                <li 
                    className="flex  mt-3"
                ><p>총 상품금액</p> <span className="ml-auto text-black text-right leading-snug break-keep">{toNumber(history.totalProduct)}원</span></li>
                <li 
                    className="flex  mt-3"
                ><p>상품 할인</p> <span className="ml-auto text-black text-right leading-snug break-keep">-{toNumber(history.totalSale)}원</span></li>
                <li 
                    className="flex  mt-3"
                ><p>배송비</p> <span className="ml-auto text-black text-right leading-snug break-keep">0원</span></li>
              </ul>
            </div>

            <div className="py-5 px-2 border-t border-t-[#ddd] mt-12 flex font-bold">
              총 {history.product.length}개 결제금액 <span className="ml-auto">{toNumber(history.total)}원</span>
            </div>

          </div>
        : null
      }

    </div>
  )

}

export default More