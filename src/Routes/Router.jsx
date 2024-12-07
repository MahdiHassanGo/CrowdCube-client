import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layout/MainLayouts";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddNewCampaign from "../Pages/AddNewCampaign";
import CampaignDetails from "../Pages/CampaignDetails";
import AllCampaigns from "../Pages/AllCampaigns";
import MyCampaigns from "../Pages/MyCampaigns";
import UpdateCampaign from "../Pages/UpdateCampaign";
import MyDonation from "../Pages/MyDonation";
import ErrorPage from "../Pages/ErrorPage";


const router = createBrowserRouter([
{
    path:'/',

    element:<MainLayouts></MainLayouts>,
    loader: () => fetch("https://crowdcube-server-two.vercel.app/campaign"),
    
},
{
    path: '/campaign/:id',
    element:<PrivateRoute> <CampaignDetails /></PrivateRoute> ,
    loader: ({ params }) => fetch(`https://crowdcube-server-two.vercel.app/campaign/${params.id}`)
  },
  
{
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
        {
            path: "/auth/login",
            element: <Login></Login>,
        },
        {
            path: "/auth/register",
            element: <Register></Register>,
        },
     
    ],
},
{
    path:'/addcampaign',
    element:<PrivateRoute><AddNewCampaign></AddNewCampaign></PrivateRoute>,
    loader:()=>fetch('https://crowdcube-server-two.vercel.app/campaign')
},
{
    path:'/campaigndetails/:id',
    element:<PrivateRoute><CampaignDetails></CampaignDetails></PrivateRoute>,
    loader:()=>fetch('https://crowdcube-server-two.vercel.app/campaign')
},
{
    path:'/allcampaigns',
    element:<PrivateRoute><AllCampaigns></AllCampaigns></PrivateRoute>,
    loader:()=>fetch('https://crowdcube-server-two.vercel.app/campaign')
},
{
    path:'/mycampaigns',
    element:<PrivateRoute><MyCampaigns></MyCampaigns></PrivateRoute>,
    loader:()=>fetch('https://crowdcube-server-two.vercel.app/campaign')
},
{
    path:'/updatecampaign/:id',
    element:<PrivateRoute><UpdateCampaign></UpdateCampaign></PrivateRoute>,
    loader: ({ params }) => fetch(`https://crowdcube-server-two.vercel.app/campaign/${params.id}`),
},
{
    path:'/mydonation/',
    element:<PrivateRoute><MyDonation></MyDonation></PrivateRoute>,
    loader: ({ params }) => fetch(`https://crowdcube-server-two.vercel.app/donate`),
},
{
    path:'*',
    element:<ErrorPage>,</ErrorPage>
}



])

export default router