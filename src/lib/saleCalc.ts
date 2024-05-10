// 세일 계산
export function saleCalc(sale : number, price: number){
    return price - (price * sale/100);
}

// 3자리마다 소수점
export const toNumber = (price : number ) =>{
    if(price !== undefined){
        return price.toLocaleString("ko-KR")
    }
}