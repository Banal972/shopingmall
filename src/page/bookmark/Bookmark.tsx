import Card from "../../components/main/Card";

export default function Bookmark() {
  return (
    <div className='_list'>

        <div className="h-[450px] text-center bg-no-repeat bg-right-bottom bg-cover bg-fixed bg-[url(/asset/image/list/listBg01.jpg)]"></div>

        <div className="py-24 max-w-[1600px] w-[95%] mx-auto">

            <h1 className="text-5xl font-bold mb-5">관심상품</h1>

            <div className="grid grid-cols-5 gap-x-7 gap-y-16 mt-12">
                <Card/>
            </div>

        </div>
        
    </div>
  )
}
