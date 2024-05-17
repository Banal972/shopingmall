import { Link, useNavigate } from "react-router-dom";

export default function Inquiry({id} : {id : string}) {
    //navigate
    const navigate = useNavigate();

    // 수정버튼
    const updateHanlder = ()=>{
        // navigate(`/detail/write?mode=u&id=${id}&token=${a.token}`);
    }

    // 삭제버튼
    const delHandler = ()=>{

        if(window.confirm('삭제 하시겠습니까?')){
            
            /* if(id){
                
                const data = {
                    productID : id,
                    user: a.user, 
                    token : a.token
                };
    
                setInquiryData((prev)=>{
                    let updateData = { ...prev }; // 복사본 생성

                    let inqury = updateData[Number(data.productID)]; // 해당 배열을 가져오기

                    // 필터링해서 제거하고
                    updateData[Number(data.productID)] = inqury.filter(item => !(item.user === data.user && item.token === data.token));

                    // 업데이트
                    return updateData;

                })

            } */

        }

    }
    
    

    return (
        <div className="mt-12">

            <ul className="border-b border-b-[#999] pb-6">
                {
                    [0,1].map((_,index)=>(
                        <li className={`${index !== 0 ? "mt-6 pt-6 border-t border-t-[#000]" : ""}`}>
                            <p className="text-xs">작성자 - 이름</p>
                            <h2 className="text-xl mt-1 font-bold">타이틀</h2>
                            <div className="mt-2">내용</div>
                            <p className="text-sm mt-3 text-[#555]">YYYY/MM/DD</p>
                            <div className="flex justify-end">
                                <button 
                                    className="text-sm w-16 h-7 bg-[#26a8e0] text-white cursor-pointer"
                                    onClick={()=>updateHanlder()}
                                >수정</button>
                                <button 
                                    className="text-sm w-16 h-7 bg-[#e02626] text-white cursor-pointer ml-3"
                                    onClick={()=>delHandler()}
                                >삭제</button>
                            </div> 
                        </li>
                    ))
                }
            </ul>

            <Link
                to={`/detail/write/${id}`}
                className="flex items-center justify-center ml-auto mt-6 w-16 h-7 text-sm bg-black text-white cursor-pointer font-medium"
            >등록</Link>

        </div>
    )
}
