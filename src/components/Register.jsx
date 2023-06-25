import React from "react";
import { useActionData, Form, Link, re, redirect } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  dynamicLinkDomain,
} from "firebase/auth";
import { auth, actionCodeSettings, database } from "../firebase.js";
import { addDoc, collection } from "firebase/firestore";

export async function action({ request }) {
  const users = collection(database, "users");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const secondpassword = formData.get("secondpassword");
  if (email === 0 || password === 0) {
    return null;
  }
  if (password !== secondpassword) {
    return { error: "Passwords differ" };
  }

  try {
    const registration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addDoc(users, {
      email: email,
      name: false,
      surname: false,
      adress: false,
    });
    return redirect("/login");
  } catch (error) {
    const message = error.message
      .replace("Firebase: Error (auth/", " ")
      .replace("-", " ")
      .replace(")", "");
    return { error: message };
  }
}

export default function Register() {
  const data = useActionData();

  return (
    <div className="loginform">
      <Form className="loginchild" method="post">
        <p>Type your email</p>
        <input name="email" type="text" placeholder="email" className="imput" />
        <br />
        <p>Type your password</p>
        <input
          name="password"
          type="password"
          placeholder="password"
          className="imput"
        />
        <p>Type your password again</p>
        <input
          name="secondpassword"
          type="password"
          placeholder="password"
          className="imput"
        />
        <br></br>
        <button type="submit">Create Account</button>
      </Form>
      {data?.email && (
        <p style={{ color: "black" }} className="p">{`new account  created`}</p>
      )}
      {data?.error && <p className="p">{data.error}</p>}
      <Link to="/login" className="link">
        {" "}
        Already have an account? Sign in
      </Link>
    </div>
  );
}
