import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { patchData, postData } from "../../utils/apiCall"
import { changePassword, otpForm } from '../../libs/YupFormikValidator';
import { TextInput } from '../../components/formComponents/inputs/TextInput';
import { Button } from '../../components/formComponents/Buttons/Button';


function ForgetAndChangePassword() {
    const [flag1, setFlag1] = useState(false);
    const [otpID, setOtpID] = useState('string');
    const navigate = useNavigate()

    async function submitForm(values, actions) {
        const val = values.phoneNumberOrEmail;
        const isPhoneNumber = /^\d{10}$/.test(val);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        if (isPhoneNumber) {
            values.phoneNumber = "+91" + val;
        } else if (isEmail) {
            values.email = val;
        } else {
            toast("Please enter a valid phone number or email.");
            return;
        }

        delete values.phoneNumberOrEmail;
        delete values.confirm_password;
        delete values.otpID;

        try {
            if (flag1) {
                if (values.phoneNumber) {
                    values.otpID = otpID;
                }

                const response = patchData("/api/users/user/change_password", values);
                toast.promise(response, {
                    pending: "password changing.",
                    success: "password changed successfully",
                    reject: "password  can't changed"
                })
                await response;
                navigate("/login")
                
            } else {
                const otpDataPromise = postData("/api/users/user/send_forgot_password_otp", values);
                toast.promise(otpDataPromise, {
                    pending: "sending OTP",
                    success: "OTP sent",
                    reject: "OTP can't be sent"
                })
                const otpData = await otpDataPromise
                setFlag1(otpData?.success);
                setOtpID(otpData?.data?.otpID);
                changePassword.initialVaues.phoneNumberOrEmail = val
            }
        } catch (error) {
            actions.resetForm();
            error(error?.response?.data?.message);
        }
    }

    return (
        <div className="flex items-center justify-center h-auto py-12">
            <div className="w-full max-w-md p-2 sm:p-8 flex items-center justify-center bg-[url('/images/common/evening.jpg')] bg-cover bg-center rounded-2xl shadow-lg">
            <div className=" inset-0 p-2 sm:p-6 bg-white/30 backdrop-blur-md rounded-2xl">
                <Formik
                    initialValues={flag1 ? { ...changePassword.initialVaues, otpID } : otpForm.initialVaues}
                    validationSchema={flag1 ? changePassword.validationSchema : otpForm.validationSchema}
                    onSubmit={submitForm}
                    enableReinitialize
                >
                    {() => (
                        <Form>
                            <h2 className='font-inter text-[1.2rem] text-center  sm:text-[1.4rem] font-bold text-[#001A6E] my-1 tracking-wider'>
                                {flag1 ? "Change Password " : "Forget password "}
                            </h2>
                            <p className='text-[13px] sm:text-[14px] text-center sm:text-start font-Poppins tracking-wider'>
                                Enter your details below
                            </p>
                            <TextInput label="Email or Phone Number *" name="phoneNumberOrEmail" type="input" />
                            {flag1 && (
                                <>
                                    <TextInput label="Password *" name="password" type="password" />
                                    <TextInput label="Confirm Password *" name="confirm_password" type="password" />
                                    <TextInput label="OTP *" name="otp" type="text" />
                                </>
                            )}
                            <Button type="submit" name={flag1 ? "Submit" : "Send OTP"} style="w-[100%] my-0 mb-2" />
                            <div className='flex items-center gap-6'>
                                <span className='text-[16px]'>Go to Login page</span>
                                <a className='no-underline hover:underline text-[#db4444] text-[13px]'><Link to={"/login"}>Login</Link></a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            </div>
        </div>
    );
}

export default ForgetAndChangePassword;
