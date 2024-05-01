import { IoHeart } from "react-icons/io5";

export default function Bookmark({className} : {className? : string}) {
  return (
    <div className={`cursor-pointer inline-block ${className}`}>
        <IoHeart/>
    </div>
  )
}
