import React from 'react'
import {
  Outlet,
NavLink
} 

from "react-router-dom";
export default function Account() {
  return (
    <div className='Account'> 
    <br></br>
   <div className='AccountNav'>
<NavLink to="/acc" className='accountlink'>Your Account</NavLink>
<NavLink to="history" className='accountlink'>Your Shoping History</NavLink>


   </div>
   <br></br>
   <Outlet />
</div>


  )
}
