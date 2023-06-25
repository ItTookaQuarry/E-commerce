import React from "react";
import utility from "../utility";
import { countthestars } from "../countstars";
import {
  Form,
  useLoaderData,
  NavLink,
  useSearchParams,
  Link,
  useActionData,
  redirect,
} from "react-router-dom";

export async function action({ request }) {
  const Formdata = await request.formData();
  const filtredproduct = Formdata.get("product");
  const pathname = new URL(request.url);
  const search = pathname.searchParams.get("category");

  if (!search && filtredproduct !== null) {
    throw redirect(`/?filtredproduct=${filtredproduct}`);
  }

  if (search && filtredproduct !== null) {
    throw redirect(`/?category=${search}&filtredproduct=${filtredproduct}`);
  }

  const producttocart = Formdata.get("currentvalue");
  const numberofproducttocart = Formdata.get(`${producttocart}`);
  const valuebefore = localStorage.getItem(producttocart);
  const valueafter = valuebefore
    ? numberofproducttocart * 1 + valuebefore * 1
    : numberofproducttocart;

  localStorage.setItem(producttocart, valueafter);

  return [producttocart, numberofproducttocart, valuebefore];
}

export function loader({ request }) {
  const pathname = new URL(request.url);
  const id = pathname.searchParams.get("id");
  if (id !== null) {
    return redirect(`${id}?id=${id}`);
  }
  return utility();
}

export default function Products() {
  console.log(useActionData());

  const [params, setparams] = useSearchParams();

  const category = params.get("category") ? params.get("category") : " ";
  const product = params.get("filtredproduct")
    ? params.get("filtredproduct")
    : " ";

  const data = useLoaderData();
  const style1 = { color: "red" };
  const style2 = { color: "black" };

  let filtredproucts = data.filter((each) => {
    if (category == " ") {
      return each;
    } else return each.category == category;
  });

  const productsaftersearch = filtredproucts.filter((each) => {
    const title = each.title;
    const titletab = title.split(" ");

    if (product == " ") {
      return each;
    } else return titletab.includes(product);
  });

  const products = productsaftersearch.map((each) => {
    const SRC = countthestars(each.rating.rate);

    return (
      <div className="main">
        <div className="tittle">{each.title}</div>

        <Link
          to={`${each.id}?id=${each.id}`}
          key={each.id}
          className="link"
          state={{ category: category, product: product }}
        >
          {" "}
          <img src={each.image} />
        </Link>

        <div className="ratinggrid">
          <div>{each.tittle}</div>
          <div className="rate">{each.rating.rate}</div>
          <img src={SRC} />
          <div className="count">{each.rating.count} users voted</div>
          <div className="price">
            <strong>{each.price}$</strong>

            <Form method="post" className="allproductstocartform" style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <input
                style={{
                  margin: "auto",
                  textAlign: "center",
                                }}
                name={each.id}
                type="number"
                min="1"
                max="10"
              />
              <button
                type="submit"
                name="currentvalue"
                value={each.id}
                style={{  margin: "auto"}}
              >
                {" "}
                +
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="ProductsFilterDiv">
        <NavLink
          className="productNavlink"
          style={({ isActive }) => {
            let style = "";
            isActive && category === "electronics"
              ? (style = style1)
              : (style = style2);
            return style;
          }}
          to={`?category=electronics`}
        >
          {" "}
          Electronics
        </NavLink>

        <NavLink
          className="productNavlink"
          to="?category=jewelery"
          style={({ isActive }) => {
            let style = "";
            isActive && category === "jewelery"
              ? (style = style1)
              : (style = style2);
            return style;
          }}
        >
          {" "}
          Jewellery
        </NavLink>

        <NavLink
          className="productNavlink"
          to="?category=men's clothing"
          style={({ isActive }) => {
            let style = "";
            isActive && category === "men's clothing"
              ? (style = style1)
              : (style = style2);
            return style;
          }}
        >
          {" "}
          Men's clothing
        </NavLink>

        <NavLink
          className="productNavlink"
          to="?category=women's clothing"
          style={({ isActive }) => {
            let style = "";
            isActive && category === "women's clothing"
              ? (style = style1)
              : (style = style2);
            return style;
          }}
        >
          {" "}
          Women's clothing
        </NavLink>

        <NavLink className="productNavlink" to="">
          Clear All filters
        </NavLink>
      </div>
      <Form method="post" className="productsearchform">
        <p>Search for product</p>
        <input name="product" type="text" placeholder="" />
        <button type="submit"> Submit</button>
      </Form>
      <div className="wrapper">{products}</div>
    </>
  );
}
