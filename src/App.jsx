import APPTest from "@src/__TESTS__";
import styles from './App.module.scss';
import Loader from "./components/loader/Loader";
import { Outlet } from "react-router-dom";
import Header from "./layouts/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogInPage from "./pages/LoginPage/LogInPage";
import ForgetAndChangePassword from "./pages/Forget_password/ForgetAndChangePassword";
import LeadManagement from "./pages/LeadManagement";
import LeadList from "./components/LeadList";
import Footer from "./layouts/footer/Footer";
import HomePage from "./pages/home/HomePage";
import LeadForm from "./components/LeadForm";

export default function App() {
  return (< div className={styles.container}>
    <Loader />
    <Header/>
    <ToastContainer />
    <Outlet/>
    <Footer/>

    {/* <HomePage/> */}
    {/* <LogInPage/> */}
    {/* <ForgetAndChangePassword/> */}
    {/* <LeadManagement/> */}
    {/* <LeadList/> */}
    {/* <LeadForm/> */}
    
    

  </div>
  );
}