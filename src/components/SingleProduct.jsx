import React, { useState } from "react";
import {
  useLoaderData,
  useLocation,
  Link,
  Form,
  useActionData,
} from "react-router-dom";
import utility from "../utility";
import { countthestars } from "../countstars";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export async function loader({ params }) {
  return utility(params.id);
}

export async function action({ request }) {
  const formData = await request.formData();
  const numberofproduct =
    formData.get("product") !== "" ? formData.get("product") : 1;
  const pathname = new URL(request.url).searchParams.get("id");
  const value = localStorage.getItem(pathname);
  const totalvalue = value * 1 + numberofproduct * 1;
  value
    ? localStorage.setItem(pathname, totalvalue)
    : localStorage.setItem(pathname, numberofproduct);
  localStorage.setItem("new", true);
  return [numberofproduct, pathname];
}

export default function SingleProduct() {
  let action = useActionData();

  let state = " ";

  const product = useLoaderData();




  if (localStorage.getItem("new")) {
    toast.success(
      () => {
        const productsorproduct = action[0] > 1 ? "products" : "product";
      
        return ( 
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {action && (
              <img
                src={`${product.image}`}
                style={{ height: "50px", width: "50px", margin: "auto" }}
              />
            )}
            <p>{`You added ${action[0]} ${productsorproduct} to cart  `}</p>
          </div>
          
        );
        
      },
      {  autoClose: 1500,position: "top-left",closeOnClick: false, }

      
    );
     localStorage.removeItem("new");
  }

  const SRC = countthestars(product.rating.rate);
  const location = useLocation();

  let filtredproduct = " ";
  let category = " ";

  if (location?.state?.product) {
    filtredproduct = location.state.product;
    localStorage.setItem("filtred", filtredproduct);
  }

  if (localStorage.getItem("filtred") !== undefined) {
    filtredproduct = localStorage.getItem("filtred");
  }

  if (location?.state?.category) {
    category = location.state.category;
    localStorage.setItem("category", category);
  }

  if (localStorage.getItem("category") != undefined) {
    category = localStorage.getItem("category");
  }

  return (
    <div className="oneproductwrapper">
      <Link
        className="backlink"
        to={`/?category=${category}&filtredproduct=${filtredproduct}`}
      >
        <img src="backicon.png" style={{ height: "50px", width: "50px" }} />
      </Link>
      <div className="tittle">{product.title}</div>
      <div className="rating">
        <img src={`${SRC}`} />
        <div>{product.rating.rate}/5</div>{" "}
        <div>{product.rating.count} Users voted</div>
      </div>
      <img src={product.image} />
      <div> {product.description}</div>

      <Form className="singleproductform" method="post">
        <input
          name="product"
          type="number"
          placeholder="text"
          min="1"
          max="10"
        />
        <button name="" type="submit">
          {" "}
          Add to basket
        </button>
      </Form>
    </div>
  );
}
