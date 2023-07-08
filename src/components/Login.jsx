import React from "react";
import {
  useActionData,
  Form,
  redirect,
  useSearchParams,
  useLoaderData,
} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import changedirection from "./changedirection.js";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === 0 || password === 0) {
    return null;
  }
  try {
    const registration = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return changedirection(email);
  } catch (error) {
    localStorage.setItem("error", true);
    const message = error.message
      .replace("Firebase: Error (auth/", " ")
      .replace("-", " ")
      .replace(")", "");

    return { error: message };
  }
}
export async function loader({ request }) {
  return "123";
}
export default function Login() {
  const data = useActionData();

  if (localStorage.getItem("error")) {
    toast.error(`${data.error}`, { autoClose: 1500, position: "top-left" });
    localStorage.removeItem("error");
  }

  return (
    <div className="loginform">
      <Form method="post" className="loginchild">
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
        <button type="submit" class="waves-effect waves-light btn"> Submit</button>
      </Form>
    </div>
  );
}
