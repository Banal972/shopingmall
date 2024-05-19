import React, { useState } from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { MdClose } from 'react-icons/md';

export default function Modal() {
  // 주소찾기 lib
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  
  /* const inputUpdate = (e : React.ChangeEvent<HTMLInputElement>, ins : string)=>{

    setData((prev)=>({
      ...prev,
      [ins] : e.target.value
    }));    

  } */

  // 주소찾기
  const zipHandleComplete = (data : any) => {
        
      let zipcode = data.zonecode;
      let fullAddress = data.address;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }

      /* setData((prev)=>({
        ...prev,
        zipcode : zipcode,
        d_addr1 : fullAddress
      })); */

  };

  // 주소찾기 이벤트
  const zipHandleClick = () => {
    open({ onComplete: zipHandleComplete });
  };

  //수정버튼
  /* const submitHanlder = ()=>{
    
    if(data.d_name === ""){
      return alert('배송자명을 입력하세요')
    }

    if(data.d_phone === ""){
      return alert('연락처을 입력하세요.')
    }

    if(data.zipcode === ""){
      return alert('우편번호을 입력하세요.')
    }

    if(data.d_addr1 === ""){
      return alert('주소을 입력하세요.')
    }

    if(data.d_addr2 === ""){
      return alert('상세주소을 입력하세요.')
    }

    if(window.confirm("배송 정보를 수정하시겠습니까?")){
      change({
        d_name : data.d_name,
        d_phone : data.d_phone,
        d_addr1 : data.d_addr1,
        d_addr2 : data.d_addr2
      })
      modal(false);
      setData({
        zipcode : "",
        d_name : "",
        d_phone : "",
        d_addr1 : "",
        d_addr2 : ""
      })
    }

  } */

  return (
    <div className="modal-delivery">
      <div className="back"></div>

      <div className="cont">

        <div className="close"><MdClose/></div>

        <div className="input-t">
          <label htmlFor="d_1">배송자명</label>
          <input 
            type="text" 
            id='d_1' 
            placeholder='배송자명'
          />
        </div>

        <div className="input-t">
          <label htmlFor="d_2">연락처</label>
          <input 
            type="text" 
            id='d_2' 
            placeholder='01000000000' 
          />
        </div>
        
        <div className="input-t" style={{maxWidth:250}}>
          <label htmlFor="d_3">우편번호</label>
          <div className="fl">
            <input type="text" id='d_3' readOnly/>
            <button onClick={zipHandleClick}>주소찾기</button>
          </div>
        </div>

        <div className="input-t">
          <label htmlFor="d_4">주소</label>
          <input 
            type="text" 
            id='d_4' 
            placeholder='주소' 
          />
        </div>
        
        <div className="input-t">
          <label htmlFor="d_5">상세주소</label>
          <input 
            type="text" 
            id='d_5' 
            placeholder='상세주소' 
          />
        </div>

        <button className='btn' >수정하기</button>

      </div>

    </div>
  )
}
