import { Formik, Form } from 'formik'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useAuthStore } from '../../libs/zustand'
import { TextInput } from '../../components/formComponents/inputs/TextInput';
import { Button } from '../../components/formComponents/Buttons/Button';
import { LoginForm } from '../../libs/YupFormikValidator';
import { postData } from '../../utils/apiCall';

export default function LogInPage() {
    const setToken = useAuthStore((state) => state.setToken)
    const navigate = useNavigate()

    async function submitForm(values, option) {

        const val = values.phoneNumberOrEmail
        const isPhoneNumber = /^\d{10}$/.test(val);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        if (isPhoneNumber) {
            values.phoneNumber = "+91" + val
        }
        else if (isEmail) {
            values.email = val
        }

        delete values.phoneNumberOrEmail

        try {
            const myPromise = postData("/api/users/user/login", values)
            toast.promise(
                myPromise,
                {
                    pending: 'logging...',
                    success: 'Login successfully 👌',
                    error: 'something went wrong.. 🤯',
                }
            );
            const data = await myPromise;
            if (data.success) {
                setToken(data?.data?.token)
                navigate("/")
            }
            option.resetForm()
        } catch (error) {
            toast.warn("Error: " + error?.response?.data?.message)
        }
    }
    return (
      <div className="flex items-center justify-center h-auto py-12 ">
      {/* <div className="w-full max-w-md p-8 bg-gradient-to-r from-cyan-50 to-blue-100 rounded-2xl shadow-lg"> */}
      <div className="w-full max-w-md p-2 sm:p-8 flex items-center justify-center bg-[url('/images/common/evening.jpg')] bg-cover bg-center rounded-2xl shadow-lg">
            <div className=" inset-0 p-2 sm:p-6 bg-white/30 backdrop-blur-md rounded-2xl">
            
         <Formik
            initialValues={LoginForm.initialVaues}
            validationSchema={LoginForm.validationSchema}
            onSubmit={submitForm}
          >
            {() => (
              <Form>
                <h2 className="font-inter text-[1.2rem] mb-4 sm:text-[1.4rem] font-bold text-[#001A6E] text-center my-1 tracking-wider">
                  Login Form
                </h2>
                <p className="text-[13px] sm:text-[14px] text-center sm:text-start font-Poppins tracking-wider">
                  Enter your details below
                </p>
                <TextInput label={"Email or Phone Number *"} name={"phoneNumberOrEmail"} type={"input"} />
                <TextInput label={"Password *"} name={"password"} type={"password"} />
                <div className="flex justify-between items-center my-[1.2rem]">
                  <Button type="submit" name={"Log In"} style={"w-[5.5rem] focus:ring-orange-500"} />
                  <div>
                    <li className="list-none no-underline hover:underline text-[#db4444] text-[13px]">
                      <Link to={"/forgetPassword"}>Forget password ?</Link>
                    </li>
                    <li className="list-none no-underline hover:underline text-[#db4444] mt-2 text-[13px]">
                      <Link to={"/signup"}>Create Account</Link>
                    </li>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        </div>
      </div>
      

    )
}

