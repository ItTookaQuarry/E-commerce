import React from "react";
import utility from "../utility";
import { useLoaderData, Form, useActionData } from "react-router-dom";
export async function loader() {
  return utility();
}

export async function action({ request }) {
  const formData = await request.formData();

  for (let i = 0; i <= 20; i++) {
    if (formData.get(i) !== null) {
      const IndexOfProduct = i;
      const NumberToDelete = formData.get(i);
      const numberbeforedeleting = localStorage.getItem(i);
      const numberafterdeleting = numberbeforedeleting - NumberToDelete;
      numberafterdeleting > 0
        ? localStorage.setItem(IndexOfProduct, numberafterdeleting)
        : localStorage.removeItem(IndexOfProduct);
      return "12123";
    }
  }
}

export default function Basket() {
const items= {...localStorage}
function ChangeState(id){
localStorage.removeItem(id)
setData((prev)=>{
  return [...prev,..."I'm doing it only to refresh the page"]
})
return 
}




  const action = useActionData();

  const loader = useLoaderData();


  const [data,setData]=React.useState(loader)
  let price = 0;

  const showfiltred = data.filter((each) => {
    return localStorage.getItem(each.id) !== null;
  });
console.log(showfiltred)
  const table = showfiltred.map((each, i) => {
    const number = localStorage.getItem(each.id);
    price = price + number * each.price;

    return (
      <>
        <div className="one">
          <h1>{each.title}</h1>
              <img src={each.image} style={{ height: "70%", width: "70%" }} />
          <div className="numb">{`${number} in cart price:`+`${Math.floor(number * each.price)}$`}</div>
          
          
            {number*1>1&&<Form className="deletebuttongrid" method="post">
              <input
                name={each.id}
                type="number"
                placeholder="1"
                min="1"
                max={number}
                style={{height:"14px",width:"35px"}}
              />
              <button type="submit" style={{border:"none", background: "transparent"}}>
                <img
                  src="trash.png"
                  alt="trash"
                  style={{ height: "20px", width: "20px",}}
                />
              </button>
            </Form> }
            {number*1===1&&
            <div className="deletebuttongrid">
                       <img
            onClick={()=>ChangeState(each.id)}
    
              src="trash.png"
              alt="trash"
              style={{ height: "20px", width: "20px", gridColumn:"-1/-2",}}
            />
             </div>
            
            }
        </div>
      </>
    );
  });

  return (
    <div className="basketgrid">
      {table}
      {price != 0 && <p >total price:{Math.floor((price*1))}$</p>}
    </div>
  );
}
