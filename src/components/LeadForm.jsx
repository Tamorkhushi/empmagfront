import React, { useEffect } from 'react';
import { createLeadForm } from '../libs/YupFormikValidator';
import { Formik, Form } from 'formik'git add .

import { useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { TextInput } from './formComponents/inputs/TextInput';
import { Button } from './formComponents/Buttons/Button';
import { patchData, postData } from '../utils/apiCall';
import { useAuthStore } from '../libs/zustand';
import { useState } from 'react';

const LeadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
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
              <TextInput label="file" name="file" type="file" className="no-border" />

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




















// import React, { useEffect, useState } from 'react';
// import { createLeadForm } from '../libs/YupFormikValidator';
// import { Formik, Form } from 'formik';
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { TextInput } from './formComponents/inputs/TextInput';
// import { Button } from './formComponents/Buttons/Button';
// import { patchData, postData } from '../utils/apiCall';
// import { useAuthStore } from '../libs/zustand';

// const LeadForm = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
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
//       let dataToSend = values;

//       if (selectedFile) {
//         dataToSend = new FormData();
//         dataToSend.append("name", values.name);
//         dataToSend.append("email", values.email);
//         dataToSend.append("status", values.status);
//         dataToSend.append("phoneNumber", values.phoneNumber);
//         dataToSend.append("avatar", selectedFile); // match with multer field
//       }

//       const apiCall = leadData
//         ? patchData(`/api/users/lead/update_leads/${leadData._id}`, dataToSend)
//         : postData("/api/users/lead/create_leads", dataToSend);

//       toast.promise(apiCall, {
//         pending: leadData ? "Updating..." : "Creating...",
//         success: leadData ? "Lead updated 👌" : "Lead created 👌",
//         error: "Something went wrong.. 🤯",
//       });

//       const data = await apiCall;
//       if (data.success) {
//         actions.setValues({
//           email: "",
//           name: "",
//           phoneNumber: "",
//           status: "",
//         });
//         setSelectedFile(null);
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
//           <Form>
//             <h2 className="text-xl text-center mb-4 font-bold text-[#001A6E] tracking-wider uppercase">
//               {leadData ? "Update Lead" : "Create Lead"}
//             </h2>

//             <TextInput label="Name *" name="name" type="input" />
//             <TextInput label="Email *" name="email" type="input" />

//             <TextInput label="Phone Number *" name="phoneNumber" type="input" />

//             <TextInput
//               label="Avatar Image"
//               name="avatar"
//               type="file"
//               attribute={{
//                 onChange: (event) => {
//                   setSelectedFile(event.currentTarget.files[0]);
//                 },
//               }}
//             />

//             {selectedFile && (
//               <img
//                 src={URL.createObjectURL(selectedFile)}
//                 alt="preview"
//                 className="w-20 h-20 mt-2 object-cover rounded"
//               />
//             )}

//             <TextInput
//               label="Status *"
//               name="status"
//               type="select"
//               options={["New", "Contacted", "Closed"]}
//             />

//             <Button
//               type="submit"
//               name={leadData ? "Update Lead" : "Create Lead"}
//               style="w-full mb-3 focus:ring-orange-500"
//             />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default LeadForm;





