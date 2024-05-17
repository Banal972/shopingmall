import {Link} from "react-router-dom"

function History() {
    
  return (
    <div className="pt-20">
        <div className="max-w-[1480px] w-[95%] mx-auto pt-24 pb-32">
            
        <h2 className="text-4xl text-center font-bold mb-10">주문내역</h2>

            <ul className='border-t-2 border-t-[#000] border-b border-b-[#eee]'>
                <li className="pt-10">
                    <p className="text-sm text-[#555]">YYYY-MM-DD</p>
                    <p className="text-sm text-[#555] mt-1">주문번호 : 0</p>
                    
                    <div className="flex items-start mt-4">
                        <div className="w-[200px] h-[200px] rounded relative">
                            <img className="absolute left-0 top-0 w-full h-full object-cover" src="http://via.placeholder.com/640x480" alt=""/>
                        </div>
                        <div className="text-sm p-4 text-[#555]">
                            <p>abc</p>
                            <p className="mt-2">SIZE : 250 | 10 개</p>
                            <p className="mt-2 text-base font-bold text-[#333]">0 원</p>
                        </div>
                    </div>
                    <div className="flex items-start mt-4 pt-4 border-t border-t-[#ddd]">
                        <div className="w-[200px] h-[200px] rounded relative">
                            <img className="absolute left-0 top-0 w-full h-full object-cover" src="http://via.placeholder.com/640x480" alt=""/>
                        </div>
                        <div className="text-sm p-4 text-[#555]">
                            <p>abc</p>
                            <p className="mt-2">SIZE : 250 | 10 개</p>
                            <p className="mt-2 text-base font-bold text-[#333]">0 원</p>
                        </div>
                    </div>

                    <Link to={'/'} className='flex items-center justify-center mt-6 bg-black text-white rounded text-center h-10 text-sm'>상세 정보</Link>
                    
                </li>
                <li className="border-t border-t-[#eee] mt-10 pt-10">
                    <p className="text-sm text-[#555]">YYYY-MM-DD</p>
                    <p className="text-sm text-[#555] mt-1">주문번호 : 0</p>
                    
                    <div className="flex items-start mt-4">
                        <div className="w-[200px] h-[200px] rounded relative">
                            <img className="absolute left-0 top-0 w-full h-full object-cover" src="http://via.placeholder.com/640x480" alt=""/>
                        </div>
                        <div className="text-sm p-4 text-[#555]">
                            <p>abc</p>
                            <p className="mt-2">SIZE : 250 | 10 개</p>
                            <p className="mt-2 text-base font-bold text-[#333]">0 원</p>
                        </div>
                    </div>
                    <div className="flex items-start mt-4 pt-4 border-t border-t-[#ddd]">
                        <div className="w-[200px] h-[200px] rounded relative">
                            <img className="absolute left-0 top-0 w-full h-full object-cover" src="http://via.placeholder.com/640x480" alt=""/>
                        </div>
                        <div className="text-sm p-4 text-[#555]">
                            <p>abc</p>
                            <p className="mt-2">SIZE : 250 | 10 개</p>
                            <p className="mt-2 text-base font-bold text-[#333]">0 원</p>
                        </div>
                    </div>

                    <Link to={'/'} className='flex items-center justify-center mt-6 bg-black text-white rounded text-center h-10 text-sm'>상세 정보</Link>
                    
                </li>
            </ul>

        </div>
    </div>
  )
}

export default History