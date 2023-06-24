import React from 'react'

export default async function utility(id) {
 const res= id==null? await fetch('https://fakestoreapi.com/products/'):await fetch(`https://fakestoreapi.com/products/${id}`)
   const json= await res.json()
  

   return  json

}
