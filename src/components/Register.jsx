import React from "react";
import { useActionData, Form, Link, re, redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase.js";
import { collection, setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
export async function action({ request }) {
  const users = collection(database, "users");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const secondpassword = formData.get("secondpassword");
  const name=formData.get("name")
  if (email === 0 || password === 0 || name===0) {
    return null;
  }
  if (password !== secondpassword) {
    localStorage.setItem("error",true)
    return { error: "Passwords differ" };
  }
  try {
    const registration = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
localStorage.setItem("created",true)
    await setDoc(doc(database, "users", auth.currentUser.uid), {
      name: name,
      surname: "Add surname",
      number: "Add phone number",
    });
    await setDoc(doc(database, "history", auth.currentUser.uid), {
      number:0,
      shopping:[],
      numbers:[],
      dates:[],
    });
    return redirect("/login");
  } catch (error) {
    localStorage.setItem("error", true);
    const message = error.message
      .replace("Firebase: Error (auth/", " ")
      .replace("-", " ")
      .replace(")", "");
    return { error: message };
  }
}

export default function Register() {

  const data = useActionData();

  if (localStorage.getItem("error")) {
    toast.error(`${data.error}`, { autoClose: 4000, position: "top-left" });
    localStorage.removeItem("error");
  }

  return (
    <div className="loginform">
      <Form className="loginchild" method="post">


      <p>Type your name</p>
        <input name="name" type="text" placeholder="your name" className="imput" />
        <br />

        
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

      <Link to="/login" className="link">
        {" "}
        Already have an account? Sign in
      </Link>
    </div>
  );
}
