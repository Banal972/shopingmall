export interface HistoryProduct {
    size: string;
    name: string;
    price: number;
    amount: number;
    sale: number;
    src: string;
}

export interface HistoryType {
    product : HistoryProduct[],
    created : number,
    id : string
}

export interface HistoryMoreType extends HistoryType {
    addr2 : string;
    delivery : string;
    deliveryName : string;
    deliveryInput : string;
    fullAddress : string;
    total : number;
    totalProduct : number;
    totalSale : number;
    userId : string;
    zipcode : string;
    name : string;
    email : string;
    pay : string;
}