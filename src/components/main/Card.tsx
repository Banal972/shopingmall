import { Link } from "react-router-dom";
import Bookmark from "./Bookmark";

export interface CardType {
  size?: number[];
  hit?: number;
  cate?: string;
  price: number;
  detail?: string;
  src?: string;
  name?: string;
  tag?: string[];
  description?: string;
  sale? : number,
  id? : string
}

export default function Card({src,name,description,price,id} : CardType) {

  return (
    <Link to={`/detail/${id}`} className="overflow-hidden relative">
      <div className="overflow-hidden relative rounded-2xl cursor-pointer border-gray-100 after:pb-[calc(400/265*100%)] after:block">
          <div className="absolute left-0 top-0 w-full h-full">
              <img src={src} className="left-0 top-0 absolute w-full h-full object-cover object-center" alt={name} />
          </div>
      </div>

      <div className="pt-4 text-base">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-base mt-3 font-medium">{price}원</p>
        <p className="whitespace-pre-line overflow-hidden line-clamp-2 text-ellipsis leading-normal text-sm mt-2 text-gray-500">{description?.split("\\n").map(line=><>{line}<br/></>)}</p>
        <Bookmark className="mt-2"/>
      </div>
    </Link>
  )
}



