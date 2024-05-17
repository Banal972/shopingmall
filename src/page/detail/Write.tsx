function Write() {
    return (
        <div className='pt-16'>

            <div className="py-36 max-w-[1024px] w-[95%] mx-auto">

                <h2 className="text-4xl text-center font-bold mb-10">상품후기 - 상품이름</h2>

                <div>
                    <label 
                        className="mb-5 text-xl font-medium block"
                        htmlFor="t"
                    >제목</label>
                    <input
                        className="w-full h-10 px-2 border border-[#ccc] block"
                        type="text" 
                        id='t'
                        value={""}
                        placeholder='제목을 입력해주세요'
                    />
                </div>
                
                <div className="mt-12">

                    <h2 className="text-xl mb-5 font-medium">내용</h2>

                    <div className="editor"></div>

                </div>

                <button 
                    className="w-full h-9 bg-black text-white mt-6 cursor-pointer"
                    type="submit"
                >등록하기</button>

            </div>

        </div>
    )
}

export default Write