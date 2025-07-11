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
   const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
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

  async function submitForm(values, actions) {
    if (values?.phoneNumber) {
      values.phoneNumber = "+91" + values.phoneNumber
    }

    try {
      const apiCall = leadData ? patchData(`/api/users/lead/update_leads/${leadData._id}`, values)
        : postData("/api/users/lead/create_leads", values)

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

    } catch (error) {
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
              <Button type="submit" name={leadData ? "Update Lead" : "Create Lead"} style="w-full mb-3 m-0 focus:ring-orange-500" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LeadForm;

// ...............................................................................





































// import React, { useEffect, useState } from 'react';
// import { Formik, Form } from 'formik';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { TextInput } from './formComponents/inputs/TextInput';
// import { Button } from './formComponents/Buttons/Button';
// import { postData, patchData } from '../utils/apiCall';
// import { useAuthStore } from '../libs/zustand';
// import { createLeadForm } from '../libs/YupFormikValidator';

// const LeadForm = () => {
//   const { token } = useAuthStore((state) => state);
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const leadData = state?.leadData;

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [uploadedImage, setUploadedImage] = useState('');

//   useEffect(() => {
//     if (!token) {
//       toast.warn("Please login to access this page");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   // File change handler
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//   };

//   async function submitForm(values, actions) {
//     try {
//       const formData = new FormData();

//       // Append image if available
//       if (file) {
//         formData.append('image', file);
//       }

//       // Append text fields to formData
//       const finalValues = { ...values };
//       if (finalValues?.phoneNumber) {
//         finalValues.phoneNumber = "+91" + finalValues.phoneNumber;
//       }
//       Object.keys(finalValues).forEach((key) => {
//         formData.append(key, finalValues[key]);
//       });

//       const apiCall = leadData
//         ? patchData(`/api/users/lead/update_leads/${leadData._id}`, formData, true)
//         : postData('/api/users/lead/create_leads', formData, true);

//       toast.promise(apiCall, {
//         pending: leadData ? 'Updating...' : 'Creating...',
//         success: leadData ? 'Lead updated 👌' : 'Lead created 👌',
//         error: 'Something went wrong 🤯',
//       });

//       const res = await apiCall;

//       if (res.success) {
//         actions.setValues({
//           email: "",
//           name: "",
//           phoneNumber: "",
//           status: "",
//         });
//         setFile(null);
//         setPreview('');
//         setUploadedImage(res.data?.imageUrl);
//         navigate('/lead_list');
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
//           <Form>
//             <h2 className="text-center mb-4 font-bold text-[#001A6E] uppercase">
//               {leadData ? "Update Lead" : "Create Lead"}
//             </h2>

//             <TextInput label="Email *" name="email" type="input" />
//             <TextInput label="Name *" name="name" type="input" />
//             <TextInput label="Phone Number *" name="phoneNumber" type="input" />

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Upload Image</label>
//               <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>

//             <TextInput
//               label="Status *"
//               name="status"
//               type="select"
//               options={["New", "Contacted", "Closed"]}
//             />

//             <Button type="submit" name={leadData ? "Update Lead" : "Create Lead"} style="w-full mb-3" />
//           </Form>
//         )}
//       </Formik>

//       {/* Image Preview Section */}
//       {preview && (
//         <div className="mt-4">
//           <p>Preview:</p>
//           <img src={preview} alt="Preview" width="200" />
//         </div>
//       )}

//       {uploadedImage && (
//         <div className="mt-4">
//           <p>Uploaded Image:</p>
//           <img src={uploadedImage} alt="Uploaded" width="200" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadForm;























































