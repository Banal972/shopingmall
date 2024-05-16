import { CardType } from "../../../../components/main/Card"

export interface CartType {
    product : CardType
    id? : string
    size : number
    amount : number
}