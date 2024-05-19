import { atom } from "recoil";
import { CartType } from "../../@types/feature/cart/cartType";

export const buyAtom = atom<CartType[]>({
    key : "buyAtom",
    default : []
})