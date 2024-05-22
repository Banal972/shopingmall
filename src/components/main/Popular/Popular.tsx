import { useEffect, useState } from 'react'
import Card from '../../common/Card/Card'
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { CardType } from '../../../@types/card';

export default function Popular() {

    const [popular,setPopular] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where("hit",">=",100),
            limit(20)
        );

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc)=>{

            const {price,description,name,src} = doc.data() as CardType;

            return {
                price,
                description,
                name,
                src,
                id : doc.id
            }

        });

        setPopular(shoes);

    }

    useEffect(()=>{
        fetch();
    },[]);

  return (
    <section className="mt-[100px]">
        <div className="max-w-[1600px] w-[95%] mx-auto items-start gap-10 md:flex">

            <h2 className=" text-2xl md:text-3xl md:mr-12 md:sticky top-[calc((30+75)*1px)]  font-bold leading-normal whitespace-nowrap">
                지금 가장<br/>
                주목해야 할 인기상품
            </h2>
            
            <div className="grid gap-5 flex-1 grid-cols-1 mt-14 md:mt-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {
                    popular.length > 0 ? popular.map((el)=> <Card key={el.id} {...el}/>) : null
                }
            </div>
        </div>
    </section>
  )
}
