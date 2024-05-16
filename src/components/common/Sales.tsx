import { saleCalc, toNumber } from "../../lib/saleCalc";

// 세일 컴포넌트
export default function SaleCalc({price, sale} : {price? : number, sale : number}) {
    if(!price) return <></>;
    return(
        <>
            <span className="sales">{toNumber(price)}</span> <span className='color00'>{toNumber(saleCalc(sale,price))}원</span>
        </>
    )
}
