import React from "react";
import utility from "../utility";
import {
  useLoaderData,
  Form,
  useActionData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export async function loader() {
  return utility();
}

export async function action({ request }) {
  const formData = await request.formData();
  const Submited = formData.get("submit");
  console.log(Submited);
  if (Submited === "true") {
    return redirect("/");
  }

  const basketlength = formData.get("basketlength");
  console.log(basketlength);
  for (let i = 0; i <= 20; i++) {
    if (formData.get(i) !== null) {
      const IndexOfProduct = i;
      const NumberToDelete = formData.get(i);
      const numberbeforedeleting = localStorage.getItem(i);
      const numberafterdeleting = numberbeforedeleting - NumberToDelete;
      numberafterdeleting > 0
        ? localStorage.setItem(IndexOfProduct, numberafterdeleting)
        : localStorage.removeItem(IndexOfProduct);

      if (basketlength === "1" && !localStorage.getItem(i)) {
        toast.info(
          () => {
            return <h1 style={{ textAlign: "center" }}>Your Cart is empty</h1>;
          },
          { position: "top-center", autoClose: 2000 }
        );
        return redirect("/");
      }
    }
  }
  return "12123";
}

export default function Basket() {
  const navigate = useNavigate();

  function ChangeState(id) {
    localStorage.removeItem(id);
    if (showfiltred.length === 1) {
      toast.info(
        () => {
          return <h1 style={{ textAlign: "center" }}>Your Cart is empty</h1>;
        },
        { position: "top-center", autoClose: 2000 }
      );
      navigate("/");
    }
    setData((prev) => {
      return [...prev, ..."I'm doing it only to refresh the page"];
    });
    return;
  }

  const loader = useLoaderData();

  const [data, setData] = React.useState(loader);
  let price = 0;

  const showfiltred = data.filter((each) => {
    return localStorage.getItem(each.id) !== null;
  });

  const table = showfiltred.map((each, i) => {
    const number = localStorage.getItem(each.id);
    price = price + number * each.price;

    return (
      <>
        <div className="one">
          <h1>{each.title}</h1>
          <img src={each.image} style={{ height: "70%", width: "70%" }} />
          <div className="numb">
            {`${number} in cart price:` + `${Math.floor(number * each.price)}$`}
          </div>

          {number * 1 > 1 && (
            <Form className="deletebuttongrid" method="post">
              <input
                name={each.id}
                type="number"
                placeholder="1"
                min="1"
                max={number}
                style={{ height: "14px", width: "35px" }}
              />
              <button
                name="basketlength"
                value={showfiltred.length}
                type="submit"
                style={{ border: "none", background: "transparent" }}
              >
                <img
                  src="trash.png"
                  alt="trash"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </Form>
          )}
          {number * 1 === 1 && (
            <div className="deletebuttongrid">
              <img
                onClick={() => ChangeState(each.id)}
                src="trash.png"
                alt="trash"
                style={{ height: "20px", width: "20px", gridColumn: "-1/-2" }}
              />
            </div>
          )}
        </div>
      </>
    );
  });

  const logged = localStorage.getItem("Log") === "true" ? true : false;

  return (
    <div className="basketgrid">
      {table}
      {price != 0 && <p>total price:{Math.floor(price * 1)}$</p>}
      {table.length !== 0 && (
        <Form method="post" className="basketform">
          <button
            name="submit"
            value={logged}
            className="basketbutton"
            onClick={() => {
              showfiltred.map((each) => {
                localStorage.removeItem(each.id);
              });

              if (localStorage.getItem("Log") === "true") {
                toast.info(
                  () => {
                    return (
                      <div
                        class="message-container"
                        style={{ fontWeight: "bolder" }}
                      >
                        <h1>Important Information</h1>
                        <p>Dear User,</p>
                        <p>
                          We regret to inform you that all the products you
                          "purchased" from our store are not genuine. They have
                          been added to your purchase history for reference
                          purposes only.
                        </p>
                        <p>
                          If you have any questions or concerns, please contact
                          our customer support.
                        </p>
                        <p>Thank you for your understanding.</p>
                        <p>Sincerely,</p>
                        <p>The Store Team</p>
                      </div>
                    );
                  },
                  { position: "top-center", autoClose: 1200 }
                );
              } else {
                return toast.info(
                  () => {
                    return (
                      <>
                        <h1 style={{ fontSize: "1.3vw" }}>
                          You Must Be logged in to Buy products
                        </h1>
                      </>
                    );
                  },
                  { autoClose: 5000, position: "top-center", toastId: "2" }
                );
              }
            }}
          >
            Click to buy products
          </button>
        </Form>
      )}
    </div>
  );
}
