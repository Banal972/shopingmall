import { CartType } from "@store/@types/feature/cart/cartType";
import { cartAtom } from "@store/feature/cart/cart";
import { useRecoilState } from "recoil";


export default function Delete({elm} : {elm : CartType}) {
  
    const [cart,setCart] = useRecoilState(cartAtom);
  
    const removeHandler = ()=>{
  
      let rs = cart.findIndex(el=>el.id === elm.id && el.size === elm.size);
  
      if(elm.amount <= 1){
        
        if(window.confirm('삭제 하시겠습니까?')){
  
          if(rs > -1){
  
            setCart((prev)=>{
              const updateCart = prev.filter((_,index)=>index !== rs);
              return updateCart;
            })
  
          }
  
        }
  
      }else{
  
        const updateCart = cart.map((item,index)=>
          index === rs
          ? {
            ...item,
            amount : item.amount - 1
          }
          : item
        );
  
        setCart(updateCart)
  
      }
  
    }
  
    return (
      <button 
        className="px-2 border-l border-l-[#ddd]"
        onClick={removeHandler}
      >-</button>
    )
}