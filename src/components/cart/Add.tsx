import { cartAtom } from '../../store/feature/cart/cart';
import { CartType } from '../../store/@types/feature/cart/cartType';
import { useRecoilState } from 'recoil';

export default function Add({elm} : {elm : CartType}) {
  
    const [cart,setCart] = useRecoilState(cartAtom);
  
    const addHandler = ()=>{
  
      const rs = cart.findIndex(el=>{ // findIndex 로 값이 있는지 체크
          return el.id === elm.id && el.size === elm.size;
      });
  
      if(rs > -1){ // 값이 존재하면
        
        // Recoil은 불변성을 강제해서 새로운 배열을 생성하고 수정해줘야합니다.
        const updateCart = cart.map((item,index)=>
          index === rs
          ? {
            ...item,
            amount : item.amount + 1
          }
          : item
        );
  
        setCart(updateCart);
  
      }
  
    }
  
    return (
        <button 
            className="px-2 border-r border-r-[#ddd]"
            onClick={addHandler}
        >+</button>
    )
}