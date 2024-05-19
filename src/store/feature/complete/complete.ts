import { atom } from "recoil";
import { HistoryMoreType } from "../../../@types/history";

export const completeAtom = atom<HistoryMoreType | null>({
    key : "completeAtom",
    default : null
})