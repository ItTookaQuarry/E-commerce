import React from "react";
import { Link } from "react-router-dom";
export default function Map() {
  return (
    <div className="mapgrid">
      <Link className="maplink" to="/login">
        log In
      </Link>
      <Link className="maplink" to="/register">
        Register
      </Link>
      <Link className="maplink" to="/">
        All products
      </Link>
      <Link className="maplink" to="/?category=electronics">
        Electronics
      </Link>
      <Link className="maplink" to="/?category=jewelery">
        Jewellery
      </Link>
      <Link className="maplink" to="/?category=men%27s%20clothing">
        Men's clothing
      </Link>
      <Link className="maplink" to="/?category=women%27s%20clothing">
        Women's clothing
      </Link>
      <Link className="maplink" to="/basket">
        Cart
      </Link>
      {localStorage.getItem("Log") === "true" && (
        <Link className="maplink" to="/acc">
          Your Account
        </Link>
      )}
    </div>
  );
}
