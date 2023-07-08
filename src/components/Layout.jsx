import React from "react";
import utility from "../utility";
import { Outlet, NavLink, useLocation, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase";

export async function loader() {}

export default function Layout() {
  if (!auth.currentUser) {
    localStorage.removeItem("Log");
  }

  if (localStorage.getItem("created")) {
    toast.success(
      () => {
        return <h1 style={{ fontSize: "1.3vw" }}>Account created</h1>;
      },
      { autoClose: 5000, position: "top-center" }
    );
    localStorage.removeItem("created");
  }
  const [data, setdata] = React.useState("No data");

  const location = useLocation();

  React.useEffect(() => {
    const asyncFn = async () => {
      const res = await fetch("https://fakestoreapi.com/products/");
      const json = await res.json();
      setdata(json);
    };
    asyncFn();
  }, []);

  const tab = [];
  let totalinstorage = 0;
  if (data[0] !== null) {
    for (let i = 1; i <= data.length; i++) {
      totalinstorage = totalinstorage + localStorage.getItem(i) * 1;

      if (localStorage.getItem(i) !== null) {
        tab.push({ ...data[i - 1], InStorage: localStorage.getItem(i) });
      }
    }
  }

  let baskettable = [];

  if (totalinstorage !== 0) {
    baskettable = tab.map((each) => {
      return (
        <div
          style={{
            gridRow: "1/2",
            display: "grid",
            gridTemplateRows: "1fr",
            backgroundColor: "white",
          }}
        >
          <div style={{ gridRow: "1/2", fontWeight: "normal" }}>
            {each.InStorage}
          </div>
          <img
            src={each.image}
            style={{ height: "5vw", width: "5vw", gridRow: "1/2" }}
          />
        </div>
      );
    });
  }

  const style1 = { color: "red", margin: "auto", fontSize: "4vw" };
  const style2 = { color: "black", margin: "auto", fontSize: "4vw" };

  const logged = localStorage.getItem("Log");

  const [shown, isshown] = React.useState("false");

  const [showfilters, setshowfilters] = React.useState(false);

  const iconclass = showfilters ? "cancel" : "view_headline";

  return (
    <>
      <nav className="NavBarGrid">
        <div
          className="div"
          style={{ color: "black", fontSize: "3vw", margin: "auto" }}
          onClick={() => {
            setshowfilters((prev) => {
              return !prev;
            });
          }}
        >
          {" "}
          <i
            style={{ height: "100%", width: "100%" }}
            class="large material-icons"
          >
            {" "}
            {iconclass}
          </i>
        </div>
        <NavLink
          className="basket"
          to={baskettable.length >= 1 ? "basket" : window.location.href}
          style={({ isActive }) => {
            let style = "";
            isActive ? (style = style1) : (style = style2);
            return style;
          }}
        >
          <i
            onMouseEnter={() => {
              isshown(true);
            }}
            onMouseLeave={() => {
              isshown(false);
            }}
            style={{ height: "100%", width: "100%" }}
            class="large material-icons"
          >
            local_grocery_store
          </i>

  
        </NavLink>
        {logged == "true" && (
          <NavLink
            onClick={() => {
              localStorage.setItem("Log", "false");
              return toast.success(
                () => {
                  const toreturn =
                    location.pathname !== "acc" ? "logged out" : redirect("/");

                  return toreturn;
                },
                { autoClose: 1500, position: "top-center" }
              );
            }}
            className="nav"
            style={{ color: "black", margin: "auto", fontSize: "4vw" }}
          >
            Log Out
          </NavLink>
        )}
        {logged !== "true" && (
          <NavLink
            to="login"
            className="nav"
            replace
            style={({ isActive }) => {
              let style = "";
              isActive ? (style = style1) : (style = style2);
              return style;
            }}
          >
            Log In
          </NavLink>
        )}{" "}
        {logged !== "true" && (
          <NavLink
            to="register"
            className="nav"
            replace
            style={({ isActive }) => {
              let style = "";
              isActive ? (style = style1) : (style = style2);
              return style;
            }}
          >
            Register
          </NavLink>
        )}
        <NavLink
          className="nav"
          style={({ isActive }) => {
            let style = "";
            isActive ? (style = style1) : (style = style2);
            return style;
          }}
          to="/"
        >
          Products
        </NavLink>
        {logged == "true" && (
          <NavLink
            to={"acc"}
            className="nav"
            style={({ isActive }) => {
              let style = "";
              isActive ? (style = style1) : (style = style2);
              return style;
            }}
          >
            <div>Your Account</div>
          </NavLink>
        )}
      </nav>
      <ToastContainer></ToastContainer>
      {showfilters && (
        <div
          style={{
            height: "100%",
            width: "90%",
            backgroundColor: "white",
            position: "absolute",
            display: "grid",
          }}
          class="collection"
          onClick={() => {
            setshowfilters((prev) => {
              return !prev;
            });
          }}
        >
          <p style={{ textAlign: "center" }}> Shop by department:</p>
          <NavLink to="/?category=electronics">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center", fontSize: "80%" }}
            >
              {" "}
              Electronics
            </a>
          </NavLink>
          <NavLink to="/?category=jewelery">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center", fontSize: "80%" }}
            >
              Jewellery
            </a>
          </NavLink>
          <NavLink to="/?category=men's clothing">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center", fontSize: "80%" }}
            >
              Men's clothing
            </a>
          </NavLink>
          <NavLink to="/?category=women's clothing">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center", fontSize: "80%" }}
            >
              Women's clothing
            </a>
          </NavLink>
          <NavLink to="/">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center", fontSize: "80%" }}
            >
              All Products
            </a>
          </NavLink>

          <NavLink to={baskettable >= 1 ? "basket" : window.location.href}>
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center" }}
            >
              Cart
            </a>
          </NavLink>
          <NavLink to="/login">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center" }}
            >
              Log in
            </a>
          </NavLink>
          <NavLink to="/register">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center" }}
            >
              Register
            </a>
          </NavLink>
          <NavLink to="/">
            <a
              class="collection-item"
              style={{ color: "black", textAlign: "center" }}
            >
              Products
            </a>
          </NavLink>
          {logged == true && (
            <NavLink to="/acc">
              <a
                class="collection-item"
                style={{ color: "black", textAlign: "center" }}
              >
                Your Account
              </a>
            </NavLink>
          )}
        </div>
      )}
  {shown === true &&
            location.pathname !== "/basket" &&
            !showfilters && (
              <div  style={{position:"absolute",display:"grid",}}>
                {baskettable}
                <p
                  style={{
                    fontSize: "1vw",
                    gridColumn: `1/${baskettable.length + 1}`,
                    margin: "auto",
                  }}
                >
                  You have {`${totalinstorage} products in Cart`}
                </p>
              </div>
            )}
      {!showfilters && <Outlet />}
    </>
  );
}
