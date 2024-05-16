import { saleCalc, toNumber } from '../../lib/saleCalc'

export default function Sale({sale,price}:{sale : number,price : number}) {
    return(
        <span>{ toNumber(saleCalc(sale,price))}원</span>
    )
}
