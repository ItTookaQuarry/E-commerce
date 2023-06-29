import React from "react";
import utility from "../utility";
import {
  Outlet,
  NavLink,

  useLocation,

} 

from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase";

export async function loader() {}

export default function Layout() {


  if(localStorage.getItem("created")){
    toast.success(    () => {
      return (
        <h1 style={{ fontSize: "1.3vw" }}>
         Account created
        </h1>
      );
    },
    { autoClose: 5000, position: "top-center" })
    localStorage.removeItem("created")
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

  let map = [];

  if (totalinstorage !== 0) {
    map = tab.map((each) => {
      return (
        <div className="baskethovergrid" style={{ border: "2px solid black" }}>
          <img src={each.image} style={{ height: "5vw", width: "5vw" }} />
          <div>{each.InStorage}</div>
        </div>
      );
    });
  }

  const style1 = { color: "red" };
  const style2 = { color: "black" };

  const logged = localStorage.getItem("Log");



  const [shown, isshown] = React.useState("false");
  return (
    <>
      <nav className="NavBarGrid" >
        <NavLink
          className="basket"
          to={map.length>=1 ? "basket": window.location.href}
          style={({ isActive }) => {
            let style = "";
            isActive ? (style = style1) : (style = style2);
            return style;
          }}
        >
          <img
            src="basket.png"
            onMouseEnter={() => {
              isshown(true);
            }}
            onMouseLeave={() => {
              isshown(false);
            }}
          />
          {shown === true && location.pathname !== "/basket" && (
            <div className="basketonhover">
              <p
                style={{
                  fontSize: "1vw",
                  gridColumn: `1/${map.length + 1}`,
                  margin: "auto",
                }}
              >
                You have {`${totalinstorage} products in Cart`}
              </p>
              {map}
            </div>
          )}
        </NavLink>








        {logged == "true" && (
          <NavLink
            onClick={() => {






              localStorage.setItem("Log", "false");
              return toast.success(()=>{
                return "Logged out"
              },{autoClose:1500,position:"top-center"})
            }}
            className="nav"
            style={{color:"black"}}
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
         {logged !== "true"&&<NavLink
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
        </NavLink>}
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
        <NavLink
          to={"map"}
          className="nav"
          style={({ isActive }) => {
            let style = "";
            isActive ? (style = style1) : (style = style2);
            return style;
          }}
        >
          Map of the page
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
      <ToastContainer ></ToastContainer>
      <Outlet />
    </>
  );
}
