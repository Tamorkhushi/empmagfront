// import React, { useEffect } from 'react';
// import { createLeadForm } from '../libs/YupFormikValidator';
// import { Formik, Form } from 'formik'

// import { useLocation, useNavigate } from "react-router-dom"
// import { toast } from 'react-toastify';
// import { TextInput } from './formComponents/inputs/TextInput';
// import { Button } from './formComponents/Buttons/Button';
// import { patchData, postData } from '../utils/apiCall';
// import { useAuthStore } from '../libs/zustand';
// import { useState } from 'react';

// const LeadForm = () => {
//   const { token } = useAuthStore((state) => state);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const leadData = state?.leadData;

//   // Redirect to login if the user is not logged in
//   useEffect(() => {
//     if (!token) {
//       toast.warn("Please login to access this page");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   async function submitForm(values, actions) {
//     if (values?.phoneNumber) {
//       values.phoneNumber = "+91" + values.phoneNumber
//     }

//     try {
//       const apiCall = leadData ? patchData(`/api/users/lead/update_leads/${leadData._id}`, values)
//         : postData("/api/users/lead/create_leads", values)

//       toast.promise(
//         apiCall,
//         {
//           pending: leadData ? "Updating..." : "Creating...",
//           success: leadData ? "Lead updated 👌" : "Lead created 👌",
//           error: 'something went wrong.. 🤯',
//         }
//       );
//       const data = await apiCall;
//       if (data.success) {
//         // resetForm() // resetForm is not working so in the place we use below set empty value
//         actions.setValues({
//           email: "",
//           name: "",
//           phoneNumber: "",
//           status: "",
//         });
//         navigate("/lead_list");
//       }

//     } catch (error) {
//       toast.warn("Error: " + error?.response?.data?.message)
//     }
//   }

//   return (
//     <>
//       <div className='bg-gradient-to-r from-cyan-50 to-blue-100 p-4 rounded-xl'>
//         <Formik
//           initialValues={{
//             email: leadData?.email || "",
//             name: leadData?.name || "",
//             phoneNumber: leadData?.phoneNumber?.replace("+91", "") || "",
//             status: leadData?.status || "New",
//           }}
//           enableReinitialize={true}
//           validationSchema={createLeadForm.validationSchema}
//           onSubmit={submitForm}
//         >
//           {() => (
//             <Form>
//               <h2 className="font-inter text-[1.2rem] text-center mb-4 sm:text-[1.4rem] font-bold text-[#001A6E] my-1 tracking-wider uppercase">
//                 {leadData ? "Update Lead" : "Create Lead"}
//               </h2>
//               <TextInput label="Email *" name="email" type="input" />
//               <TextInput label="Name *" name="name" type="input" />
//               <TextInput label="Phone Number *" name="phoneNumber" type="input" />

//               <TextInput
//                 label="Status *"
//                 name="status"
//                 type="select"
//                 options={["New", "Contacted", "Closed"]}
//               />
//               <Button type="submit" name={leadData ? "Update Lead" : "Create Lead"} style="w-full mb-3 m-0 focus:ring-orange-500" />
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default LeadForm;






















// ............................................newcode ................
// import React, { useEffect, useState } from 'react';
// import { createLeadForm } from '../libs/YupFormikValidator';
// import { Formik, Form } from 'formik';
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { TextInput } from './formComponents/inputs/TextInput';
// import { patchData, postData } from '../utils/apiCall';
// import { useAuthStore } from '../libs/zustand';
// import { Button } from './formComponents/Buttons/Button';

// const LeadForm = () => {
//   const [avatar, setAvatar] = useState(null);
//   const { token } = useAuthStore((state) => state);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const leadData = state?.leadData;

//   useEffect(() => {
//     if (!token) {
//       toast.warn("Please login to access this page");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   async function submitForm(values, actions) {
//     if (values?.phoneNumber) {
//       values.phoneNumber = "+91" + values.phoneNumber;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('email', values.email);
//       formData.append('name', values.name);
//       formData.append('phoneNumber', values.phoneNumber);
//       formData.append('status', values.status);
//       if (avatar) {
//         formData.append('avatar', avatar);
//       }

//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         }
//       };

//       const apiCall = leadData
//         ? patchData(`/api/users/lead/update_leads/${leadData._id}`, formData, config)
//         : postData("/api/users/lead/create_leads", formData, config);

//       toast.promise(apiCall, {
//         pending: leadData ? "Updating..." : "Creating...",
//         success: leadData ? "Lead updated 👌" : "Lead created 👌",
//         error: "Something went wrong.. 🤯"
//       });

//       const data = await apiCall;

//       if (data.success) {
//         actions.setValues({
//           email: "",
//           name: "",
//           phoneNumber: "",
//           status: ""
//         });
//         setAvatar(null);
//         navigate("/lead_list");
//       }

//     } catch (error) {
//       toast.warn("Error: " + error?.response?.data?.message);
//     }
//   }

//   return (
//     <div className='bg-gradient-to-r from-cyan-50 to-blue-100 p-4 rounded-xl'>
//       <Formik
//         initialValues={{
//           email: leadData?.email || "",
//           name: leadData?.name || "",
//           phoneNumber: leadData?.phoneNumber?.replace("+91", "") || "",
//           status: leadData?.status || "New",
//         }}
//         enableReinitialize={true}
//         validationSchema={createLeadForm.validationSchema}
//         onSubmit={submitForm}
//       >
//         {() => (
//           <Form encType="multipart/form-data">
//             <h2 className="font-bold text-center text-[#001A6E] text-xl mb-4">
//               {leadData ? "Update Lead" : "Create Lead"}
//             </h2>
//             <TextInput label="Email *" name="email" type="input" />
//             <TextInput label="Name *" name="name" type="input" />
//             <TextInput label="Phone Number *" name="phoneNumber" type="input" />
//             <TextInput
//               label="Status *"
//               name="status"
//               type="select"
//               options={["New", "Contacted", "Closed"]}
//             />
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Upload Photo *</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setAvatar(e.target.files[0])}
//                 className="mt-1 block w-full"
//                 required
//               />
//             </div>
//             <Button type="submit" name={leadData ? "Update Lead" : "Create Lead"} style="w-full"/>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default LeadForm;










import React, { useEffect } from 'react';
import { createLeadForm } from '../libs/YupFormikValidator';
import { Formik, Form } from 'formik'

import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { TextInput } from './formComponents/inputs/TextInput';
import { Button } from './formComponents/Buttons/Button';
import { patchData, postData } from '../utils/apiCall';
import { useAuthStore } from '../libs/zustand';
import { useState } from 'react';

const LeadForm = () => {
  const [file,setFile] = useState("")
  const { token } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { state } = useLocation();
  const leadData = state?.leadData;



  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!token) {
      toast.warn("Please login to access this page");
      navigate("/login");
    }

  }, [token, navigate]);


const setimgfile = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
};

  async function submitForm(values, actions) {
    if (values?.phoneNumber) {
      values.phoneNumber = "+91" + values.phoneNumber
    }

   if (!file) {
  toast.warn("Please select an image!");
  return;
}

    try {
   const formData = new FormData();
    formData.append('avatar',values.avatar);  // ✅ image file
    formData.append('email', values.email);
    formData.append('name', values.name);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('status', values.status)

    
  for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

      const apiCall = leadData 
      ? patchData(`/api/users/lead/update_leads/${leadData._id}`, values)
        : postData("/api/users/lead/create_leads/",formData)


      toast.promise(
        apiCall,
        {
          pending: leadData ? "Updating..." : "Creating...",
          success: leadData ? "Lead updated 👌" : "Lead created 👌",
          error: 'something went wrong.. 🤯',
        }
      );
      const data = await apiCall;
      if (data.success) {
        // resetForm() // resetForm is not working so in the place we use below set empty value
        actions.setValues({
          email: "",
          name: "",
          phoneNumber: "",
          status: "",
        });
        navigate("/lead_list");
      }

    } 
    catch (error) {
      toast.warn("Error: " + error?.response?.data?.message)
    }
  }


  return (
    <>
      <div className='bg-gradient-to-r from-cyan-50 to-blue-100 p-4 rounded-xl'>
        <Formik
          initialValues={{
            email: leadData?.email || "",
            name: leadData?.name || "",
            phoneNumber: leadData?.phoneNumber?.replace("+91", "") || "",
            status: leadData?.status || "New",
          }}
          enableReinitialize={true}
          validationSchema={createLeadForm.validationSchema}
          onSubmit={submitForm}
        >
          {() => (
            <Form>
              <h2 className="font-inter text-[1.2rem] text-center mb-4 sm:text-[1.4rem] font-bold text-[#001A6E] my-1 tracking-wider uppercase">
                {leadData ? "Update Lead" : "Create Lead"}
              </h2>
              <TextInput label="Email *" name="email" type="input" />
              <TextInput label="Name *" name="name" type="input" />
              <TextInput label="Phone Number *" name="phoneNumber" type="input" />

              <TextInput
                label="Status *"
                name="status"
                type="select"
                options={["New", "Contacted", "Closed"]}
              />

               <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload Photo *</label>
              <input
                type="file"
                accept="image/*"
                onChange={setimgfile}
                // onChange={(e) => setAvatar(e.target.files[0])}
                className="mt-1 block w-full"
                required
              />
            </div>
              <Button type="submit" name={leadData ? "Update Lead" : "Create Lead"} style="w-full mb-3 m-0 focus:ring-orange-500" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LeadForm

// ...............................................................................



























