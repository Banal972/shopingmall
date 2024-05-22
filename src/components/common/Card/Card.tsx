import { useNavigate } from "react-router-dom";
import Bookmark from "../Btn/Bookmark";
import { CardType } from "../../../@types/card";
import React from "react";

export default function Card({src,name,description,price,id} : CardType) {

  const navigate = useNavigate();

  const onClick = ()=>{
    navigate(`/detail/${id}`);
  }

  return (
    <div onClick={onClick} className="overflow-hidden relative">
      <div className="overflow-hidden relative rounded-2xl cursor-pointer border-gray-100 after:pb-[calc(400/265*100%)] after:block">
          <div className="absolute left-0 top-0 w-full h-full">
              <img src={src} className="left-0 top-0 absolute w-full h-full object-cover object-center" alt={name} />
          </div>
      </div>

      <div className="pt-4 text-base">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-base mt-3 font-medium">{price}원</p>
        <p className="whitespace-pre-line overflow-hidden line-clamp-2 text-ellipsis leading-normal text-sm mt-2 text-gray-500">{description?.split("\\n").map((line,index)=><React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
        <Bookmark id={id} className="mt-2"/>
      </div>
    </div>
  )
}



