import { BsCart2, BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed z-50 top-0 left-0 w-full text-white transition-[background]">
      <div className="max-w-[1600px] w-[95%] mx-auto h-[75px] items-center flex justify-between">
        <div className="relative z-10 filter-[invert(1)]">
          <Link to={"/"}>
            <img src="/asset/image/logo.svg" alt="쇼핑몰 로고" width={50}/>
          </Link>
        </div>

        <nav className="flex h-full font-medium text-base absolute left-1/2 -translate-x-1/2">
          <Link className="px-4 h-full flex items-center" to={"/list/999"}>BEST</Link>
          <Link className="px-4 h-full flex items-center" to={"/list/001"}>스니커즈</Link>
          <Link className="px-4 h-full flex items-center" to={"/list/002"}>스포츠</Link>
          <Link className="px-4 h-full flex items-center" to={"/list/456"}>SALE</Link>
          <Link className="px-4 h-full flex items-center" to={"/list/789"}>ONLY</Link>
        </nav>

        <div className="flex items-center">

          <nav className="flex items-center">

            {/* 장바구니 */}
            <div className="text-2xl relative">
              {
                <p className='absolute right-0 top-0 bg-red-500 text-white text-xs w-[12.5px] h-[12.5px] flex items-center justify-center rounded-full overflow-hidden translate-x-1/4 -translate-y-1/4'>{1}</p>
              }
              <Link to={"/cart"}><BsCart2/></Link>
            </div>

            {/* 마이페이지 */}
            <div className="text-2xl relative ml-[calc(15/24*1em)]">
              <BsPerson/>
              <div className="absolute text-sm left-1/2 top-full mt-4 -translate-x-1/2 hidden text-black">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 z-10">
                  <img src="/asset/image/snb_dep2Arr.png" alt="" />
                </div>
                <ul className="relative z-10 bg-white p-3 py-4 whitespace-nowrap border-[#ddd] text-center rounded-md">
                    <>
                      <li><Link to={"/login"}>로그인</Link></li>
                      <li className="mt-2"><Link to={"/sign"}>회원가입</Link></li>
                    </>
                    <>
                        <li><Link to={"/slang"}>관심상품</Link></li>
                        <li className="mt-2"><Link to={"/history"}>주문내역</Link></li>
                        <li className="mt-2"><Link to={"/"} onClick={()=>{}}>로그아웃</Link></li>
                    </>                  
                </ul>
              </div>
            </div>

          </nav>

          {/* 메뉴 */}
          <div className="relative w-6 h-3 ml-10 cursor-pointer">
            <span className="absolute left-0 top-0 w-full -translate-y-1/2 bg-white block h-[2px]"></span>
            <span className="absolute left-0 w-full -translate-y-1/2 bg-white block h-[2px] top-1/2"></span>
            <span className="absolute left-0 w-full -translate-y-1/2 bg-white block h-[2px] top-full"></span>
          </div>

        </div>

      </div>

    {/* mob-menu */}
      <div className='fixed right-0 top-0 translate-x-full h-full w-[85%] bg-white border-l border-[#ddd] max-w-[380px] text-black text-2xl box-border font-medium flex flex-col transition-transform z-10'>
        
        <div className="relative h-20">
            <div className="relative w-6 h-3 ml-10 cursor-pointer">
                <span className="absolute left-0 top-0 w-full -translate-y-1/2 bg-white block h-[2px] rotate-45"></span>
                <span className="absolute left-0 w-full -translate-y-1/2 bg-white block h-[2px] top-full -rotate-45"></span>
            </div>
        </div>

        <ul className="p-[calc(20/22*1em)]">
          <li><Link to={"/list/999"}>BEST</Link></li>
          <li className="mt-[calc(15/22*1em) pt-[calc(15/22*1em)] border-t border-[#ccc]"><Link className="block" to={"/list/001"}>스니커즈</Link></li>
          <li className="mt-[calc(15/22*1em) pt-[calc(15/22*1em)] border-t border-[#ccc]"><Link className="block" to={"/list/002"}>스포츠</Link></li>
          <li className="mt-[calc(15/22*1em) pt-[calc(15/22*1em)] border-t border-[#ccc]"><Link className="block" to={"/list/456"}>SALE</Link></li>
          <li className="mt-[calc(15/22*1em) pt-[calc(15/22*1em)] border-t border-[#ccc]"><Link className="block" to={"/list/789"}>ONLY</Link></li>          
        </ul>

        <div className="text-sm bg-[#111] text-white mt-auto p-[calc(20/14*1em)] break-keep">
            <p className="leading-snug">
                <a href="https://github.com/Banal972" target='_blank' rel="noreferrer">https://github.com/Banal972</a>
            </p>

            <p className='pt-3 mt-3 border-t border-[#ffffff51]'>Copyright 2024.Banal. All rights reserved.</p>
        </div>

      </div>

    </header>
  )
}
