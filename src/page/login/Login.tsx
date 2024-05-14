import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function Login() {

    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();

    const onSubmit = async (event : any)=>{
        const {email,password} = event;

        try {
            await signInWithEmailAndPassword(auth,email,password);
            navigate('/');
        }
        catch(e){
            if(e instanceof FirebaseError){
                console.log(e);
            }
        }


    }

  return (
    <div className='py-64 flex items-center justify-center flex-col'>

        <h1 className='text-4xl font-bold mb-10'>로그인</h1>

        <div className='w-5/6 max-w-[450px]'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='text-sm text-left pb-2 mb-3 relative after:absolute after:left-0 after:bottom-0 after:w-[90%] after:h-[2px] after:bg-black'>회원</p>
                <input
                    className='h-11 w-full px-4 min-w-0 box-border border border-[#555]'
                    type="text" 
                    placeholder='이메일'
                    {...register('email')}
                />
                <input
                    className="h-11 w-full px-4 min-w-0 box-border border border-[#555] border-t-0"
                    type="password" 
                    placeholder='비밀번호' 
                    autoComplete="off" 
                    {...register('password')}
                />
                <button className='w-full h-11 bg-black border border-[#000] text-white text-sm cursor-pointer' type="submit">로그인</button>
            </form>

            <div className='flex justify-between text-base text-[#888] mt-2'>
                <Link to={"/sign"}>회원가입</Link>
            </div>

        </div>

    </div>
  )
}
