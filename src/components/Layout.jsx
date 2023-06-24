import React from "react";
import utility from "../utility";
import {
  Outlet,
  NavLink,
  useLoaderData,
  redirect,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";

export async function loader() {}

export default function Layout() {
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
        <div className="baskethovergrid">
          <img src={each.image} style={{ height: "80px", width: "80px" }} />
          <div>{each.InStorage}</div>
        </div>
      );
    });
  }

  const navigation = useNavigate();

  const style1 = { color: "red" };
  const style2 = { color: "white" };

  const logged = localStorage.getItem("Log");

const style= logged=="true" ? {display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr" }:
{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr " }

console.log(style)


  const [shown, isshown] = React.useState("false");
  return (
    <>
      <nav className="NavBarGrid" style={style}>
        <NavLink className="basket" to="basket">
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
              <p>You have {`${totalinstorage} products in Cart`}</p>
              {map}
            </div>
          )}
        </NavLink>
        {logged == "true" && (
          <NavLink
            onClick={() => {
              localStorage.setItem("Log", "false");
              return " 123";
            }}
            className="nav"
          >
            Log Out
          </NavLink>
        )}
        {logged !== "true" && (
          <NavLink to="login" className="nav" replace>
            Log In
          </NavLink>
        )}{" "}
        <NavLink to="register" className="nav" replace>
          Register
        </NavLink>
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
        <NavLink to={"map"} className="nav">
          Map of the page
        </NavLink>

        {logged == "true" && <NavLink to={"acc"} className="nav" style={{display:"grid"}}>
        <img src="user.png" style={{height:"30px",margin:"auto"}}/>
        <div>Your Account</div>
        </NavLink>}

      </nav>
      <Outlet />
    </>
  );
}
