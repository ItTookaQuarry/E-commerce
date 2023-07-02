import React from "react";
import { auth, database } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useLoaderData, redirect } from "react-router-dom";
import {toast } from "react-toastify"
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
  const data = useLoaderData();
  console.log(data);

  const history = data.map((each,index) => {
    let price=0
    return (
      <div className="Shoppinghistorygrid">
        <h1>{`Your ${index + 1} Shopping at ${each.date}`}</h1> 
        {each.shopping.map((product) => {

          price=price+((product.number*1)*(product.price*1))
          return (
           <div className="ProductsInShoppingHistory">
            <br></br>
            <div style={{fontWeight:"bolder"}}>{`${product.number} `} {product.title }</div>
              <img src={product.src} style={{height:"50px", width:"50px",margin:"auto"}}/>
              <div style={{textAlign:"center"}}>{product.price}</div>
              <br></br>
            </div>
          );
        })}
       <div style={{fontWeight:"bolder",margin:"auto",gridColumn:"1/6"}}>Price : {price}$</div>
      </div>
    );
  });

  return <div>{history}</div>;
}
