import Bookmark from "./Bookmark";

export default function Card() {
  return (
    <div className="overflow-hidden relative">
        
        <div className="overflow-hidden relative rounded-2xl cursor-pointer border-gray-100 after:pb-[calc(400/265*100%)] after:block">
            <div className="absolute left-0 top-0 w-full h-full">
                <img src="https://placehold.co/600x400" className="left-0 top-0 absolute w-full h-full object-cover object-center" alt="" />
            </div>
        </div>

        <div className="pt-4 text-base">
          <h2 className="font-bold text-lg">텍스트</h2>
          <p className="text-base mt-3 font-medium">2000원</p>
          <p className="overflow-hidden line-clamp-2 text-ellipsis leading-normal text-sm mt-2 text-gray-500">설명문 입니다.</p>
          <Bookmark className="mt-2"/>
        </div>

    </div>
  )
}
