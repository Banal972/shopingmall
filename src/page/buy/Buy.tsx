import { useRecoilValue, useSetRecoilState} from 'recoil'
import { buyAtom } from '../../store/feature/buy/buy'
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import useGetUser from '../../hooks/useGetUser';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { toNumber } from '../../lib/saleCalc';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { completeAtom } from '../../store/feature/complete/complete';
import { HistoryMoreType } from '../../@types/history';

function Buy() {

  const navigate = useNavigate();
  const {register,handleSubmit,watch} = useForm();
  const deliveryWatch = watch('delivery');
  const buyValue = useRecoilValue(buyAtom);
  const setComplete = useSetRecoilState(completeAtom);
  const user = useGetUser();  
  const [addr,setAddr] = useState({
    zipcode : "",
    fullAddress : "",
    addr2 : ""
  });
  const [pay,setPay] = useState('간편결제');

  const [totalPay,setTotalPay] = useState({
    total : 0,
    totalProduct : 0,
    totalSale : 0
  });

  useEffect(()=>{

    let totalProduct = 0, totalSale = 0;

    buyValue.forEach(e=>{
      totalProduct += e.product.price * e.amount;
      if(e.product.sale){
        totalSale += (e.product.price * e.product.sale / 100) * e.amount;
      }
    });

    setTotalPay({
      total : (totalProduct - totalSale),
      totalProduct : totalProduct,
      totalSale : totalSale
    })

  },[buyValue]);

  const fetchUser = async()=>{
    
    if(!user) return;
    
    const fetchQuery = query(
      collection(db,"user"),
      where('userId',"==",user.uid)
    );
    
    const snapshot = await getDocs(fetchQuery);

    const addr = snapshot.docs.map((doc) => {

      const {zipcode,addr2,fullAddress} = doc.data();

      return {
        zipcode,
        fullAddress,
        addr2
      }

    });

    setAddr((prev)=>({
      ...prev,
      ...addr[0]
    }));

  };
  useEffect(()=>{
    fetchUser();
  },[user]);

  const onSubmitHandler = async (event : any)=>{

    const {delivery,deliveryInput} = event;
    // console.log(buyValue,addr,totalPay,pay,delivery,deliveryInput);

    if(!user) return;

    const product = buyValue.map((e)=>{
      return {
        amount : e.amount,
        size: e.size,
        src : e.product.src,
        name : e.product.name,
        price : e.product.price,
        sale : e.product.sale || 0,
      }
    });

    console.log(product);
    
    try {

      const {displayName,email,uid} = user;

      const addData : HistoryMoreType = {
        addr2 : addr.addr2,
        fullAddress : addr.fullAddress,
        zipcode : addr.zipcode,
        created : Date.now(),
        delivery : delivery || "",
        deliveryInput : deliveryInput || "",
        email : `${email}`,
        deliveryName : `${displayName}`,
        pay,
        product : product,
        total : totalPay.total,
        totalProduct : totalPay.totalProduct,
        totalSale : totalPay.totalSale,
        userId : uid,
      }

      await addDoc(collection(db,"history"),addData);
      setComplete(addData);

      alert('구매가 완료 되었습니다.');
      return navigate('/complete');

    }
    catch(e){
      if(e instanceof FirebaseError){
        console.log(e);
      }
    }

  }

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <>
      <div className="pt-20">

          <div className="py-32 max-w-[1024px] w-[95%] mx-auto">

            <form onSubmit={handleSubmit(onSubmitHandler)}>

              <div>
                <h4 className='font-semibold text-xl flex'>상품정보 총 {buyValue.length}개</h4>

                <ul className='mt-5'>
                  {
                    buyValue.map((el,index)=>(
                      <li 
                        className={`flex ${index !== 0 ? "mt-4 pt-4 border-t border-t-[#eee]" : ""}`}
                      >
                        <div className="w-[200px] h-[200px] rounded-md relative">
                          <img 
                            className="absolute left-0 top-0 w-full h-full object-cover"
                            src={el.product.src}
                            alt={el.product.name}
                          />
                        </div>
                        <div className="pl-4">
                          {
                            el.product.sale ? <div className="text-xs bg-[#e02626] inline-flex text-white w-[50px] h-[20px] items-center justify-center mb-2 mr-2">SALE</div> : ""
                          }
                          {
                            el.product.only && <div className="text-xs inline-flex text-white w-[50px] h-[20px] items-center justify-center mb-2 bg-[#2fb7cf]">ONLY</div>
                          }
                          <dl className="text-sm">
                            <dt>{el.product.name}</dt>
                            <dd className='mt-2 text-[#555]'>사이즈 - {el.size}</dd>
                            <dd className='mt-2 text-black font-medium'>
                              {
                                el.product.size 
                                ?
                                <>
                                  {toNumber(el.product.price)}원 <span className='font-normal text-[#555]'>{el.amount}개</span>
                                </>
                                :
                                <>
                                  {toNumber(el.product.price)}원 <span className='font-normal text-[#555]'>{el.amount}개</span>
                                </>
                              }
                            </dd>
                          </dl>
                        </div>
                      </li>
                    ))
                  }
                </ul>

              </div>

              <div className="mt-6 pt-6 border-t border-t-[#eee]">

                <h4 className='flex'>
                  배송 정보 
                  {/* <button type='button' className='ml-auto text-[#5190BC] cursor-pointer'>변경하기</button> */}
                </h4>

                <ul className='mt-5 text-sm'>
                  <li>{user?.displayName}</li>
                  <li className='mt-2'>{addr.fullAddress}</li>
                  <li className='mt-2'>{addr.addr2}</li>
                </ul>

                <select 
                  className='mt-4 w-full border border-[#999] h-9 bg-white'
                  {...register("delivery")}
                >
                  <option value="">요청사항을 선택해주세요</option>
                  <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                  <option value="부재 시 택배함에 넣어주세요">부재 시 택배함에 넣어주세요</option>
                  <option value="부재 시 집 앞에 놔주세요">부재 시 집 앞에 놔주세요</option>
                  <option value="배송 전 연락바랍니다">배송 전 연락바랍니다</option>
                  <option value="직접입력">직접입력</option>
                </select>
                {
                  deliveryWatch === "직접입력" &&
                  <div className="mt-4 w-full h-9 border border-[#999]">
                    <input 
                      className="w-full h-full px-2 outline-none"
                      type="text" 
                      placeholder='배송 시 요청사항을 입력해주세요.' 
                      {...register("deliveryInput")}
                    />
                  </div>
                }
              </div>

              <div className="mt-6 pt-6 border-t border-t-[#eee]">

                <h4 className='font-semibold text-xl flex'>총 결제금액 <p className='ml-auto text-[#e02626] font-bold'>{toNumber(totalPay.total)}원</p></h4>

                <ul className='mt-5 text-sm'>
                  <li className='flex text-[#555]'>총 상품금액 <span className='ml-auto text-black font-medium'>{toNumber(totalPay.totalProduct)}원</span></li>
                  <li className="mt-2 flex">상품 할인 <span className='ml-auto text-black font-medium'>{toNumber(totalPay.totalSale)}원</span></li>
                  <li className="mt-2 flex">배송비 <span className='ml-auto text-black font-medium'>0원</span></li>
                </ul>

              </div>

              <div className="mt-6 pt-6 border-t border-t-[#eee]">
                <h4 className='font-semibold text-xl flex'>결제 방법</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
                  {
                    ["간편결제","카드","가상계좌","휴대폰"].map((e,i)=>(
                      <button
                        key={i} 
                        className={`h-10 border border-[#ccc] rounded-sm cursor-pointer ${pay === e ? "bg-black text-white" : ""}`} 
                        type="button"
                        onClick={()=>{setPay(e)}}
                      >{e}</button>
                    ))
                  }
                </div>
              </div>

              <button 
                className='w-full h-10 bg-black text-white mt-[75px] rounded-sm cursor-pointer'
              >{toNumber(totalPay.total)}원 결제하기</button>
            
            </form>

          </div>

      </div>
    </>
  )

}

export default Buy