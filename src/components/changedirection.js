import React from "react"
import { redirect } from "react-router-dom"
import { getDoc,doc } from "firebase/firestore"
import { database,auth } from "../firebase"


export default async function changedirection(email) {



localStorage.setItem("Log","true")
localStorage.setItem("ShowHello","true")


    throw redirect("/"
    )
   }