import React from "react"
import { redirect } from "react-router-dom"
import { database } from "../firebase";

export default async function changedirection(email) {

localStorage.setItem("Log",true)
localStorage.setItem("email",email)

    throw redirect("/"
    )
   }