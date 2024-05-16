import { useParams } from "react-router-dom";
import Popular from "../../components/detail/popular/Popular";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { DetailType, ProductType } from "../../components/main/Card";
import Sticky from "../../components/detail/sticky/Sticky";

export default function Detail() {

    const {id} = useParams();
    const [detail,setDetail] = useState<DetailType>();
    const [step,setStep] = useState(0);

    const fetch = async()=>{
        if(!id) return;
        const detailQuery = await getDoc(doc(db, "shoes", String(id)));
        const data  = detailQuery.data() as ProductType;
        setDetail({
            ...data,
            id
        });
    }

    useEffect(()=>{
        fetch();
    },[id]);


  return (
    <div className="pt-10">

        <div className="max-w-[1480px] w-[90%] mx-auto flex relative items-start pt-24 pb-40 gap-x-20">

            <div className="flex-1 min-w-0 box-border">

                <div className="box-border p-0">
                    <div className="max-w-[450px] mx-auto">
                        <div className={`bg-no-repeat bg-center bg-cover border border-[#ddd] rounded-md overflow-hidden after:block after:pb-[100%] relative`}>
                            <img src={detail?.src} alt={detail?.name} className="absolute left-0 top-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div className="mt-24">

                    <ul className="flex">
                        {/* border-bottom: 0; border-width: 2px; border-color: #000; */}
                        {/* 
                            &:not(.active){
                                border: 0; border-top: 1px solid #ddd; border-bottom: 2px solid #000;
                            }
                         */}
                        <li 
                            className={`w-3/12 text-base border-r border-r-[#e6e6e6] border border-[#464646] text-center py-2 cursor-pointer border-b-2 border-b-[#000] ${step === 0 ? "border-b-0 border-2 border-[#000]" : ""}`}
                            onClick={()=>setStep(0)}
                        >상세정보</li>
                        <li 
                            className={`w-3/12 text-base border-t border-t-[#ddd] text-center py-2 cursor-pointer border-b-2 border-b-[#000] ${step === 1 ? "border-b-0 border-2 border-[#000]" : ""}`}
                            onClick={()=>setStep(1)}
                        >상품후기</li>
                        <li className="w-3/12 text-base text-center border-t border-t-[#ddd] py-2 border-b-2 border-b-[#000]"></li>
                        <li className="w-3/12 text-base text-center border-t border-t-[#ddd] py-2 border-b-2 border-b-[#000]"></li>
                    </ul>

                    {
                        step === 0 &&
                            <div className="cont">{detail?.detail}</div>
                    }

                    {/* {
                        step === 1 &&
                            <Inquiry user={userData}/>
                    } */}

                </div>

                <Popular/>

            </div>

            {
                detail && <Sticky detail={detail}/>
            }

        </div>

    </div>
  )
}
