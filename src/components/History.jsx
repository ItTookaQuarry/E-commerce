import React from "react";
import { auth, database } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useLoaderData, redirect } from "react-router-dom";
import {toast } from "react-toastify"
import M from "materialize-css";
export async function loader() {
  const history = doc(database, "history", auth.currentUser.uid);
  const document = await getDoc(history);
  const data = document.data();

  if (data.dates.length<1) {
    toast.info(()=>{
      return (<p style={{textAlign:"center"}}>Your History is empty</p>)
    },{position:"top-center"})
    return redirect("/acc");
  }

  const dates = data.dates;
  const numbers = data.numbers;
  const shopping = [...data.shopping];
  let tab = [];

  for (let i = 0; i < numbers.length; i++) {
    const date = dates[i];
    const oneshopping = shopping.splice(0, numbers[i] * 1);
    const obj = { date: date, shopping: oneshopping };
    tab.push(obj);
  }

  return tab;
}

export default function History() {
  const dismissAll = () =>  toast.dismiss();
  const data = useLoaderData();
  console.log(data);


function showcollection(index){
  console.log(data[index].shopping)
  const table=data[index].shopping
  let price=0
return toast.info(()=>{
  const mapped= table.map(each=>{
    price=price+each.price
    return <div style={{display:"grid", gridTemplateColumns:"1fr 2fr 5fr",}}>
      <div>{each.number}
      x</div> 
      <img src={each.src} style={{width:"50px",height:"50px"}}/>
      <div>{each.title}</div>


    </div>
    



  })
  return (
<div >
{mapped}
<div style={{textAlign:"center"}} >Price : {price}$</div>
</div>

  )
},{position:"top-center",width:"300%",  autoClose: false})
}



  const history = data.map((each,index) => {
    let price=0
    return (
      <div class="collection ">
    <a 
    onClick={()=>{
      dismissAll()
      showcollection(index)}}
    
    class="collection-item" style={{textAlign:"center"}}>{` ${index + 1}  at ${each.date}`}</a>


      </div>
      
    );
  });

  return <div>{history}</div>;
  
}
