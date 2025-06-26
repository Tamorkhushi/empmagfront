import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../libs/zustand';
import { postData } from '../../utils/apiCall';
import { otpForm, signUpForm } from '../../libs/YupFormikValidator';
import { TextInput } from '../../components/formComponents/inputs/TextInput';
import { Button } from '../../components/formComponents/Buttons/Button';

function SignupPage() {
    const setToken = useAuthStore((state) => state.setToken)
    const [flag, setFlag] = useState(false);
    const [otpID, setOtpID] = useState("");
    const navigate = useNavigate()

    async function submitForm(values, actions) {
        const val = values.phoneNumberOrEmail;
        const isPhoneNumber = /^\d{10}$/.test(val);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        if (isPhoneNumber) {
            values.phoneNumber = "+91" + val;
        } else if (isEmail) {
            values.email = val;
        }
        delete values.phoneNumberOrEmail;
        delete values.confirm_password;

        try {
            if (flag) {
                if (values.phoneNumber) {
                    values.otpID = otpID;
                }
                const userCreate = postData("/api/users/user/signup/", values);
                toast.promise(
                    userCreate, {
                    pending: "user creating..",
                    success: "user created successfully..",
                    reject: "user can't be created.."
                });

                const response = await userCreate;
                setToken(response.data.token)
                navigate("/")
                actions.resetForm();
                toast("Sign up successful ✌");

            } else {
                console.log("hello", values);
                
                const sendOTP = postData("/api/users/user/send_signup_otp/", values);
                toast.promise(
                    sendOTP, {
                    pending: "OTP sending..",
                    success: "OTP sent successfully..",
                    reject: "OTP can't be sent.."
                }
                )
                const otpData = await sendOTP;

                if (isPhoneNumber) {
                    setOtpID(otpData?.data?.otpID);
                }
                if (otpData?.success) {
                    setFlag(true);
                    signUpForm.initialVaues.phoneNumberOrEmail = val
                }
            }

        } catch (error) {
            toast(error?.response?.data?.message);
        }

    }

    return (
        <div className="flex items-center justify-center h-auto py-12 ">
           {/* <div className="w-full max-w-md p-8 bg-gradient-to-r from-cyan-50 to-blue-100 rounded-2xl shadow-lg"> */}
           <div className="w-full max-w-md flex items-center justify-center p-2 sm:p-8 bg-[url('/images/common/evening.jpg')] bg-cover bg-center rounded-2xl shadow-lg">
            <div className=" inset-0 p-2 sm:p-6 bg-white/30 backdrop-blur-md rounded-2xl">
            
           <Formik
                    initialValues={flag ? { ...signUpForm.initialVaues, otpID } : otpForm.initialVaues}
                    enableReinitialize
                    validationSchema={flag ? signUpForm.validationSchema : otpForm.validationSchema}
                    onSubmit={submitForm}
                >
                    {() => (
                        <Form>
                            <h2 className='font-inter text-[1.2rem] text-center mb-4 sm:text-[1.4rem] font-bold text-[#001A6E] my-1 tracking-wider'>
                                {flag ? "Sign Up " : "Enter Email Or Phone No"}
                            </h2>
                            <p className='text-[13px] sm:text-[14px] text-center sm:text-start font-Poppins tracking-wider'>
                                {flag ? "Enter your details below" : "So that, We can verify you via OTP"}
                            </p>

                            <TextInput label="Email or Phone Number *" name="phoneNumberOrEmail" type="input" attribute={{ disabled: flag }} />
                            {flag && (
                                <>
                                    <TextInput label="Name *" name="name" type="input" />
                                    <TextInput label="Password *" name="password" type="password" />
                                    <TextInput label="Confirm Password *" name="confirm_password" type="password" />
                                    <TextInput label="OTP *" name="otp" type="text" />
                                </>
                            )}

                            <Button type="submit" name={flag ? "Create Account" : "Send OTP"} style="w-full mb-3 m-0 focus:ring-orange-500" />

                            <div className='list-none flex items-center justify-center sm:justify-start gap-6'>
                                <span className='text-[16px]'>Already have an account?</span>
                                <a className='no-underline hover:underline text-[#db4444] text-[13px]'>
                                    <Link to={"/login"}>Login</Link>
                                </a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            </div>
        </div>

    );
}

export default SignupPage;
