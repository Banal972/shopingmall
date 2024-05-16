import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../store/feature/cart/cart";

export default function Buy({checkItem} : {checkItem : string[]}) {
  
    // 네비게이터
    const navigate = useNavigate();
  
    // 유저 가져오기
    const user = auth.currentUser;
  
    const [cart,setCart] = useRecoilState(cartAtom);
  
    // 구매버튼
    /* const buyBtn = ()=>{
      
      if(userData && authLogin(userData,navigate)){
  
        const buy :BuyType[] = [];
  
        cart.forEach(e=>{
  
          const data = {
            product_id : e.id,
            product_size : e.size,
            product_amount: e.amount,
          }
  
          buy.push(data);
  
        });
  
        if(window.confirm('상품을 구매하시겠습니까?')){
          navigate('/buy',{state : {type : "cart", buy}});
        }
  
      }
  
    } */

    const removeHanlder = ()=>{
        if(checkItem.length <= 0){
            return alert('체크된 상품이 없습니다.')
        }
  
        if(window.confirm("삭제하시겠습니까?")){

        setCart((prev)=>{
            const prevCart = [...prev].filter(el => !checkItem.includes(`${el.id}${el.size}`));
            return prevCart;
        });

        }
    }
  
    return (
      <div className="flex justify-end mt-6">
        <button onClick={removeHanlder} className="border w-32 h-10 font-bold cursor-pointer text-base bg-[#e02626] text-white border-[#e02626]">선택삭제</button>
        <button className="bg-black border border-black text-white w-32 h-10 font-bold cursor-pointer text-base ml-5">결제하기</button>
      </div>
    )
}