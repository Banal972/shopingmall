import { atom } from "recoil";
import { TagType } from "../../@types/feature/tag/tagtype";

export const tagAtom = atom<TagType[]>({
    key : "tagAtom",
    default : [
        {
            "tagNumber" : "001",
            "name" : ["전체","하이","로우"]
        },
        {
            "tagNumber" : "002",
            "name" : ["전체","운동화","농구화","등산화"]
        },
        {
            "tagNumber" : "003",
            "name" : ["전체"]
        },
        {
            "tagNumber" : "456",
            "name" : ["전체","스니커즈","운동화","농구화","등산화"]
        },
        {
            "tagNumber" : "789",
            "name" : ["전체","스니커즈","운동화","농구화","등산화"]
        },
        {
            "tagNumber" : "999",
            "name" : ["전체","스니커즈","운동화","농구화","등산화"]
        }
    ]
})