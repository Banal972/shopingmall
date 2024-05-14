import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Sign() {

    const navigate = useNavigate();

    const postcodeOpen = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const {register,handleSubmit} = useForm();
    const [argge,setArgge] = useState(false);
    const [zipcode,setZipcode] = useState('');
    const [fullAddress,setFullAddress] = useState('');
    const [isEmailError,setIsEmailError] = useState('');
    const [isPasswordError,setIsPasswordError] = useState('');
    const [isNameError,setIsNameError] = useState('');

    // 주소검색2
    const zipHandleComplete = (post : Address)=>{

        const {zonecode,address,addressType,bname,buildingName} = post;

        let zipcode = zonecode;
        let fullAddress = address;
        let extraAddress = '';
    
        if (addressType === 'R') {
          if (bname !== '') {
            extraAddress += bname;
          }
          if (buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${buildingName}` : buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setZipcode(zipcode);
        setFullAddress(fullAddress);

    }

    // 주소검색1
    const zipHanlderClick = ()=>{
        postcodeOpen({onComplete : zipHandleComplete})
    }

    // 회원가입
    const onSumbit = async (data : any)=>{
        const {email,password,confirmPassword,name,addr2} = data;

        if(!argge){
            return alert('동의버튼을 눌러주세요.');
        }

        if(email === ""){
            return setIsEmailError("이메일을 입력해주세요.");
        }

        if(name === ""){
            return setIsNameError('성함을 입력해주세요.');
        }

        if(password === "" || confirmPassword === ""){
            return setIsPasswordError('비밀번호를 입력해주세요.');
        }

        if(password !== confirmPassword){
            return setIsPasswordError('비밀번호가 동일하지 않습니다.');
        }

        try{

            const credentials = await createUserWithEmailAndPassword(auth,email,password);

            await updateProfile(credentials.user,{
                displayName : name
            });

            await addDoc(collection(db,'user'),{
                zipcode,
                fullAddress,
                addr2,
                userId : credentials.user.uid
            });

            alert('회원가입이 완료되었습니다.');
            return navigate('/');

        }
        catch{
            return alert('오류가 발생했습니다.');    
        }

    }

    return (
        <div className="py-36">

            <div className="max-w-[850px] w-[95%] mx-auto">

                <h1 className="text-4xl text-center font-bold">회원가입</h1>

                <div className="mt-12">

                    <form onSubmit={handleSubmit(onSumbit)}>
                        <div className="text-base font-medium">
                            
                            <div className="text-sm h-52 border border-[#ddd] box-border p-4">
                                <div className="overflow-y-auto h-full leading-tight font-normal break-keep"></div>
                            </div>
                            <div className="mt-3 text-sm">
                                <div className="inline-flex gap-2 items-center cursor-pointer" onClick={()=>setArgge(!argge)}>
                                    <div className={`w-4 h-4 border  flex items-center justify-center text-xs ${argge ? "border-teal-400 bg-teal-400 text-white" : "border-[#ddd]"}`}><IoCheckmark/></div> 동의합니다.
                                </div>
                            </div>

                        </div>

                        <p className="pb-[6px] text-lg relative mt-12 font-medium after:absolute after:left-0 after:bottom-0 after:w-[95%] after:h-[2px] after:bg-black">정보</p>

                        <div className="border-b border-b-[#ddd]">
                            <div className="grid grid-cols-[150px_1fr] text-sm border-b-[#ddd]">
                                <div className="p-4">이메일<sup className="text-red-500">*</sup></div>
                                <div className="p-4">
                                    <input type="email" {...register('email')} placeholder="이메일을 입력해주세요" className="h-8 px-3 border border-[#ddd] min-w-0 w-full"/>
                                    <p className="text-xs text-red-500 mt-1">{isEmailError}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] text-sm border-b-[#ddd]">
                                <div className="p-4">성함<sup className="text-red-500">*</sup></div>
                                <div className="p-4">
                                    <input type="text" {...register('name')} placeholder="성함을 입력해주세요" className="h-8 px-3 border border-[#ddd] min-w-0 w-full"/>
                                    <p className="text-xs text-red-500 mt-1">{isNameError}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] text-sm border-b-[#ddd]">
                                <div className="p-4">비밀번호<sup className="text-red-500">*</sup></div>
                                <div className="p-4">
                                    <input type="password" {...register('password')} placeholder="비밀번호을 입력해주세요" className="h-8 px-3 border border-[#ddd] min-w-0 w-full"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] text-sm border-b-[#ddd]">
                                <div className="p-4">비밀번호 확인<sup className="text-red-500">*</sup></div>
                                <div className="p-4">
                                    <input type="password" {...register('confirmPassword')} placeholder="동일한 비밀번호을 입력해주세요" className="h-8 px-3 border border-[#ddd] min-w-0 w-full"/>
                                    <p className="text-xs text-red-500 mt-1">{isPasswordError}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[150px_1fr] text-sm border-b-[#ddd]">
                                <div className="p-4">주소</div>
                                <div className="p-4">
                                    <div className="flex"><input type="text" className="h-8 px-3 border border-[#ddd] min-w-0 w-full" defaultValue={zipcode} disabled style={{maxWidth:150}}/> <button onClick={zipHanlderClick} type='button' className="text-xs border-0 bg-black text-white ml-1 w-16 cursor-pointer">주소찾기</button></div>
                                    <div className="mt-1"><input type="text" className="h-8 px-3 border border-[#ddd] min-w-0 w-full" defaultValue={fullAddress} disabled/></div>
                                    <div className="mt-1"><input type="text" {...register('addr2')} className="h-8 px-3 border border-[#ddd] min-w-0 w-full" placeholder='상세주소을 입력해주세요'/></div>
                                </div>
                            </div>
                        </div>

                        <button className="w-28 bg-black text-white border-0 mt-8 mx-auto block text-base font-medium h-11 cursor-pointer" type="submit">회원가입</button>
                    </form>

                </div>

            </div>

        </div>
    )
  
}