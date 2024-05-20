import {AiFillGithub} from "react-icons/ai";

function Footer() {
  return (
    
    <footer className="bg-[#111] text-white py-12 text-sm leading-tight break-keep">
        <div className="max-w-[95%] w-full mx-auto">

            <div className="text-[calc(14/24*1em)]">
                <div className="inline-block">
                    <a href="https://github.com/Banal972" target='_blank' rel="noreferrer"><AiFillGithub size={20}/></a>
                </div>
            </div>

            <p className='mt-[calc(10/14*1em)]'>
                <a href="https://github.com/Banal972" target='_blank'rel="noreferrer">https://github.com/Banal972</a>
            </p>
            <p className='pt-2 mt-2 border-t border-[#ffffff51]'>Copyright 2024.Banal. All rights reserved.</p>
        </div>
    </footer>

  )
}

export default Footer