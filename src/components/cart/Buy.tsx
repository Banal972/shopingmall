import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartAtom } from "@store/feature/cart/cart";
import { buyAtom } from "@store/feature/buy/buy";

export default function Buy({checkItem} : {checkItem : string[]}) {
  
    // 네비게이터
    const navigate = useNavigate();
    const [cart,setCart] = useRecoilState(cartAtom);
    const setBuy = useSetRecoilState(buyAtom);
  
    // 구매버튼
    const buyBtn = ()=>{

      const user = auth.currentUser;

      if(!user) {
        alert('로그인을 해야합니다.');
        return navigate('/login');
      }
      
      if(window.confirm('상품을 구매하시겠습니까?')){
        setBuy(cart);
        setCart([]);
        return navigate('/buy');
      }
  
    }

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
        <button 
          className="border w-32 h-10 font-bold cursor-pointer text-base bg-[#e02626] text-white border-[#e02626]"
          onClick={removeHanlder}
        >선택삭제</button>
        <button 
          className="bg-black border border-black text-white w-32 h-10 font-bold cursor-pointer text-base ml-5"
          onClick={buyBtn}
        >결제하기</button>
      </div>
    )
}