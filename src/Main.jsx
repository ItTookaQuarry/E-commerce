import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom"
import Products, { loader as Productloader, action as Productsaction } from './components/Products';
import Login,{action as LoginAction} from './components/Login';
import Register,{action as RegisterAction} from './components/Register';
import SingleProduct,{loader as SingleProductloader,action as SingleProductaction, loader} from './components/SingleProduct';
import Map from './components/Map';
import Layout, {loader as Layoutloader} from './components/Layout';
import Basket,{loader as Basketloader,action as Basketaction} from './components/Basket';
import Account, {loader as Accountloader,action as Accountaction} from './components/Account';

const router= createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Layout loader={Layoutloader}/>}   >
<Route  path="/" element={<Products />}  loader={Productloader} action={Productsaction}/>
<Route  path="/:id" element={<SingleProduct />} loader={SingleProductloader} action={SingleProductaction}/>
<Route  path="login" element={<Login />} action={LoginAction} />
<Route  path="register" element={<Register/>} action={RegisterAction} />
<Route  path="basket" element={<Basket/>} loader={Basketloader} action={Basketaction} />
<Route  path="map" element={<Map/>} />
<Route path="acc" element={<Account/>} loader={Accountloader} action={Accountaction}/>
    
        </Route>


))








function Main() {
  return (
<RouterProvider router={router} />
  );
}

export default Main;