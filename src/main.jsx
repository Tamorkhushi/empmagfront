import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/home/HomePage.jsx'
import SignupPage from './pages/SignUpPage/SignupPage.jsx'
import LogInPage from './pages/LoginPage/LogInPage.jsx'
import ForgetAndChangePassword from './pages/Forget_password/ForgetAndChangePassword.jsx'
import LeadManagement from './pages/LeadManagement.jsx'
import LeadList from './components/LeadList.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", 
        element: <HomePage/>
      },
      {
        path:"/login",
        element:<LogInPage/>
      },
      {
        path:"/signUp",
        element:<SignupPage/>
      },
      {
        path:"/forgetPassword",
        element:<ForgetAndChangePassword/>
      },
      {
        path:"/lead_management",
        element:<LeadManagement/>
      },
      {
        path:"/lead_list",
        element:<LeadList/>
      },
      
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
