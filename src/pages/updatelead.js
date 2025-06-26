import React, { useEffect, useState } from 'react';
import { createLeadForm } from '../libs/YupFormikValidator';
import { Formik, Form } from 'formik'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { TextInput } from './formComponents/inputs/TextInput';
import { Button } from './formComponents/Buttons/Button';
import { postData } from '../utils/apiCall';
import { useAuthStore } from '../libs/zustand';

  const updated = () => {
    const { token } = useAuthStore((state) => state);
    const navigate = useNavigate();
  
    // Redirect to login if the user is not logged in
    useEffect(() => {
      if (!token) {
        toast.warn("Please login to access this page");
        navigate("/login");
      }
    }, [token, navigate]);

  async function submitForm(values, option) {
    console.log("lead form data", values);

    if (values?.phoneNumber) {
      values.phoneNumber = "+91" + values.phoneNumber
    }

    try {
      console.log('before responce', values);
      const myPromise = postData("/api/users/lead/create_leads", values)

      console.log('after responce', myPromise);

      toast.promise(
        myPromise,
        {
          pending: 'Creating...',
          success: 'Lead is created 👌',
          error: 'something went wrong.. 🤯',
        }
      );
      const data = await myPromise;
      // if (data.success) {
      //   // console.log("success leadsss data", data);
      // }
      option.resetForm()
    } catch (error) {
      toast.warn("An error occurred:" + error?.response?.data?.message)
    }
  }
 
  return (
    <>
    <div className='bg-gradient-to-r from-cyan-50 to-blue-100 p-4 rounded-xl'>

   
      <Formik
        initialValues={createLeadForm.initialVaues}
        validationSchema={createLeadForm.validationSchema}
        onSubmit={submitForm}

      >
        {() => (
          <Form>
            <h2 className='font-inter text-[1.2rem] text-center mb-4 sm:text-[1.4rem] font-bold text-[#001A6E] my-1 tracking-wider uppercase'>
              create Lead 
            </h2>


            <TextInput label="email *" name="email" type="input" />
            <TextInput label="Name *" name="name" type="input" />
            <TextInput label="phoneNumber *" name="phoneNumber" type="input" />
            <TextInput
              label="Status *"
              name="status"
              type="select"
              options={["New", "Contacted", "Closed"]}
            />
            <Button type="submit" name={"Create lead"} style="w-full mb-3 m-0 focus:ring-orange-500" />

          </Form>
        )}
      </Formik>

      </div>
    </>
  );
};

export default updated;
