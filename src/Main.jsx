import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom"
import Products, { loader as Productloader, action as Productsaction } from './components/Products';
import Login,{action as LoginAction,loader  as LoginLoader} from './components/Login';
import Register,{action as RegisterAction} from './components/Register';
import SingleProduct,{loader as SingleProductloader,action as SingleProductaction, loader} from './components/SingleProduct';
import Map from './components/Map';
import Layout, {loader as Layoutloader} from './components/Layout';
import Basket,{loader as Basketloader,action as Basketaction} from './components/Basket';
import Account from './components/Account';
import YourAccount, {loader as Accountloader,action as Accountaction} from './components/YourAccount';
import History,{loader as historyloader} from './components/History';
const router= createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Layout loader={Layoutloader}/>}   >
<Route  path="/" element={<Products />}  loader={Productloader} action={Productsaction}/>
<Route  path="/:id" element={<SingleProduct />} loader={SingleProductloader} action={SingleProductaction}/>
<Route  path="login" element={<Login />} action={LoginAction} loader={LoginLoader} />
<Route  path="register" element={<Register/>} action={RegisterAction} />
<Route  path="basket" element={<Basket/>} loader={Basketloader} action={Basketaction} />
<Route  path="map" element={<Map/>} />
<Route path="acc" element={<Account/>} >
<Route  index element={<YourAccount/>} loader={Accountloader} action={Accountaction}/>
<Route  path="history" loader={historyloader} element={<History/>} />
</Route>
    
        </Route>


))








function Main() {
  return (
<RouterProvider router={router} />
  );
}

export default Main;