import Cart from "../pages/frontend/Cart";
import Home from "../pages/frontend/Home";
import Product_Detail from "../pages/frontend/Product/Product_Detail";
import Register from "../pages/frontend/Register";
import Login from "../pages/frontend/Login";
import Account from "../pages/frontend/Account";
import Payment from "../pages/frontend/Payment";
import Product_All from "../pages/frontend/Product/Product_All";
import Product_Category from "../pages/frontend/Product/Product_Category";
import Product_Brand from "../pages/frontend/Product/Product_Brand";
import Product_Search from "../pages/frontend/Product/Product_Search";
import Order from "../pages/frontend/Account/Order";
import News from "../pages/frontend/News";
import NewsTopic from "../pages/frontend/News/NewsTopic";
import NewsDetail from "../pages/frontend/News/NewsDetail";
import Setting from "../pages/frontend/Account/Setting";
import SettingPassword from "../pages/frontend/Account/SettingPassword";
import SettingAddress from "../pages/frontend/Account/SettingAddress";
import ForgotPassword from "../pages/frontend/Login/ForgotPassword";
import Page from "../pages/frontend/Page";

const RouterPublic = [
    {path:'/',component:Home},
    {path:'/login',component:Login},
    {path:'/login/forgot-password', component:ForgotPassword},
    {path:'/register',component:Register},
    {path:'/cart',component:Cart},
    {path:'/payment',component:Payment},
    {path:'/san-pham/chi-tiet-san-pham/:slug',component:Product_Detail},
    {path:'/tai-khoan',component:Account},
    {path:'/tai-khoan/don-hang/:limit/:page',component:Order},
    {path:'/tai-khoan/cai-dat',component:Setting},
    {path:'/tai-khoan/mat-khau',component:SettingPassword},
    {path:'/tai-khoan/dia-chi',component:SettingAddress},
    {path:'/danh-muc/:slug/:page/:limit',component: Product_Category},
    {path:'/thuong-hieu/:slug/:page/:limit',component: Product_Brand},
    {path:'/tim-kiem/:key/:page/:limit',component:Product_Search},
    {path:'/san-pham/:page/:limit',component:Product_All},
    {path:'/tin-tuc/:page/:limit',component:News},
    {path:'/tin-tuc/:slug/:page/:limit',component:NewsTopic},
    {path:'/tin-tuc/:slug',component:NewsDetail},
    {path:'/chinh-sach/:slug', component: Page},




];

export default RouterPublic;