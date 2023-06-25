import React from "react";
import { useActionData, Form, redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import changedirection from "./changedirection.js";
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
    const message = error.message
      .replace("Firebase: Error (auth/", " ")
      .replace("-", " ")
      .replace(")", "");

    return { error: message };
  }
}

export default function Login() {
  const data = useActionData();

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
        <button type="submit"> Submit</button>
      </Form>

      {data && <p className="p">{data.error}</p>}
    </div>
  );
}
