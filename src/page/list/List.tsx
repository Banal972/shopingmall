import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card, { CardType } from "../../components/main/Card";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import { tagAtom } from "../../store/feature/tag/tag";

export default function List() {

    const {cate} = useParams();
    const [list,setList] = useState<CardType[]>([]); // 기본 데이터
    const [filterList,setFilterList] = useState<CardType[]>([]); // 필터 데이터
    const [title,setTitle] = useState("타이틀");
    const tagValue = useRecoilValue(tagAtom).filter(el=>el.tagNumber === cate);
    
    const tagHanlder = (names : string)=>{
        if(names === "전체"){
            return setFilterList(list);
        }
        const filterList = list.filter((el=>el.tag?.includes(names)));
        setFilterList(filterList);
    }

    const fetch = async ()=>{
        
        let fetchQuery;

        switch(cate){
            case "999":
                setTitle("BEST");
                break;
            case "789":
                setTitle("ONLY");
                break;
            case "456":
                setTitle("SALE");
                break;
            case "001":
                setTitle("스니커즈");
                break;
            case "002":
                setTitle("스포츠");
                break;
        }

        switch(cate){
            case "999":
                fetchQuery = query(
                    collection(db,"shoes"),
                    where("hit",">=",100),
                    limit(20)
                );
                break;
            case "789":
                fetchQuery = query(
                    collection(db,"shoes"),
                    where("only","==",true),
                    limit(20)
                );
                break;
            case "456":
                fetchQuery = query(
                    collection(db,"shoes"),
                    where("sale",">",0),
                    limit(20)
                );
                break;
            default : 
                fetchQuery = query(
                    collection(db,"shoes"),
                    where("cate","==",cate),
                    limit(20)
                );
            break;
        }

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc)=>{

            const {price,description,name,src,tag} : CardType = doc.data();

            return {
                price,
                description,
                name,
                src,
                tag,
                id : doc.id
            }

        });

        setList(shoes);
        setFilterList(shoes);

    }

    useEffect(()=>{
        fetch();
    },[cate]);

    // 화면 맨위로
    useEffect(()=>{
      window.scrollTo(0,0);
    },[location])
  
    return (
      <div className='box-border'>
  
          <div className="h-[450px] text-center bg-no-repeat bg-right-bottom bg-cover bg-fixed bg-[url(/asset/image/list/listBg01.jpg)]"></div>
  
          <div className="py-24 max-w-[1600px] w-[95%] mx-auto">
  
              <h1 className="text-5xl font-bold mb-5">{title}</h1>
  
              <ul className="flex flex-wrap text-sm gap-3">
                {/* background: #000; color: #fff; border-color: #000; */}
                {
                    tagValue.map((el)=>
                        el.name.map((names,index)=>
                            <li onClick={()=>tagHanlder(names)} key={index} className="font-medium border border-[#ccc] rounded-full py-1 px-3 cursor-pointer flex-none ">{names}</li>
                        )
                    )
                }
              </ul>

              <div className="grid grid-cols-5 gap-x-7 gap-y-16 mt-12">
                {
                    filterList.map((el)=><Card key={el.id} {...el}/>)
                }
              </div>

          </div>
          
      </div>
    )
}
