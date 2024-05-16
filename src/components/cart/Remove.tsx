import { useRecoilState } from 'recoil';
import { cartAtom } from '../../store/feature/cart/cart';
import { CartType } from '../../store/@types/feature/cart/cartType';

export default function Remove({elm} : {elm : CartType}) {
    const [cart,setCart] = useRecoilState(cartAtom);
      
    const removeHandler = ()=>{
  
      let rs = cart.findIndex(el=>el.id === elm.id && el.size === elm.size);
  
      if(window.confirm('삭제 하시겠습니까?')){
  
        if(rs > -1){
  
          setCart((prev)=>{
            const prevCart = [...prev].filter((_,index)=>index !== rs); // splice로 배열삭제
            return prevCart;
          })
  
        }
  
      }
  
    }
  
    return(
      <button 
        className="delete"
        onClick={removeHandler}
      >삭제하기</button>
    )
}
