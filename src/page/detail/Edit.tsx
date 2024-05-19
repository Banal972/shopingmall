import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { InquiryType } from '../../@types/inquiry';
import { ProductType } from '../../components/common/Card/Card';


function Edit() {

    const editorRef = useRef<Editor>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [productId,setProductId] = useState('');

    const {register,handleSubmit,setValue} = useForm();

    const onSumbitHanlder = async (event : any)=>{

        const user = auth.currentUser;

        if(!id || !editorRef.current || !user) return;

        const {title} = event;
        const content = editorRef.current?.getInstance().getHTML();

        if(title === ""){
            return alert('제목을 입력해주세요.');
        }
        
        try {
            await updateDoc(
                doc(db,"inquiry",id),
                {
                    title,
                    content,
                    writer : user.displayName,
                    created : Date.now(),
                    userId : user.uid
                }
            );
            alert('수정이 완료 되었습니다.');
            return navigate(`/detail/${productId}`);
        }
        catch(e){
            if(e instanceof FirebaseError ){
                console.log(e);
            }
        }

    }

    const fetch = async ()=>{
        if(!id) return;
        const inquiryQuery = await getDoc(doc(db, "inquiry", String(id)));
        const inquiry = inquiryQuery.data() as InquiryType;
        setValue('title',inquiry.title);
        setProductId(inquiry.productId);
        editorRef.current?.getInstance().setHTML(inquiry.content);

        const detailQuery = await getDoc(doc(db, "shoes", inquiry.productId));
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

                <h2 className="text-4xl text-center font-bold mb-10">상품후기 - {name}</h2>

                <form onSubmit={handleSubmit(onSumbitHanlder)}>
                    <div>
                        <label 
                            className="mb-5 text-xl font-medium block"
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

                        <h2 className="text-xl mb-5 font-medium">내용</h2>

                        <div className="editor h-[450px]">
                            <Editor
                                toolbarItems={
                                    [
                                        ['heading', 'bold', 'italic', 'strike'],
                                        ['hr', 'quote'],
                                    ]
                                }
                                hideModeSwitch={true}
                                height="100%"
                                initialEditType="wysiwyg"
                                placeholder="내용을 입력해 주세요."
                                ref={editorRef}
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

export default Edit