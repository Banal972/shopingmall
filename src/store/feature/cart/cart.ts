import { atom } from "recoil";
import { CartType } from "../../@types/feature/cart/cartType";

export const cartAtom = atom<CartType[]>({
    key : "cartAtom",
    default : []
});