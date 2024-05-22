import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { ProductType } from '../../@types/card';


function Write() {

    const editorRef = useRef<Editor>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [name,setName] = useState('');

    const {register,handleSubmit} = useForm();

    const onSumbitHanlder = async (event : any)=>{

        const user = auth.currentUser;

        if(!id || !editorRef.current || !user) return;

        const {title} = event;
        const content = editorRef.current?.getInstance().getHTML();

        if(title === ""){
            return alert('제목을 입력해주세요.');
        }
        
        try {
            await addDoc(
                collection(db,"inquiry"),
                {
                    title,
                    content,
                    productId : id,
                    writer : user.displayName,
                    created : Date.now(),
                    userId : user.uid
                }
            );
            alert('작성이 완료 되었습니다.');
            return navigate(`/detail/${id}`);
        }
        catch(e){
            if(e instanceof FirebaseError ){
                console.log(e);
            }
        }

    }

    const fetch = async ()=>{
        if(!id) return;
        const detailQuery = await getDoc(doc(db, "shoes", String(id)));
        const {name} = detailQuery.data() as ProductType;
        setName(name);
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    useEffect(()=>{
        fetch();
    },[]);

    return (
        <div className='pt-16'>

            <div className="py-36 max-w-[1024px] w-[95%] mx-auto">

                <h2 className="text-2xl md:text-4xl text-center font-bold mb-10">상품후기 - {name}</h2>

                <form onSubmit={handleSubmit(onSumbitHanlder)}>
                    <div>
                        <label 
                            className="mb-5 text-lg md:text-xl font-medium block"
                            htmlFor="t"
                        >제목</label>
                        <input
                            className="w-full h-10 px-2 border border-[#ccc] block"
                            type="text" 
                            id='t'
                            placeholder='제목을 입력해주세요'
                            {...register('title')}
                        />
                    </div>
                    
                    <div className="mt-12">

                        <h2 className="text-lg md:text-xl mb-5 font-medium">내용</h2>

                        <div className="editor h-[350px] md:h-[450px]">
                            <Editor
                                ref={editorRef}
                                initialValue={" "}
                                placeholder="내용을 작성해주세요."
                                previewStyle="vertical"
                                hideModeSwitch={true}
                                toolbarItems={
                                    [
                                        ['heading', 'bold', 'italic', 'strike'],
                                        ['hr', 'quote'],
                                    ]
                                }
                                initialEditType="WYSIWYG"
                                height="100%"
                            />
                        </div>

                    </div>

                    <button 
                        className="w-full h-9 bg-black text-white mt-6 cursor-pointer"
                        type="submit"
                    >등록하기</button>
                </form>

            </div>

        </div>
    )
}

export default Write