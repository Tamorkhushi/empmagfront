// import { ErrorMessage, Field } from "formik"

// export function TextInput({ label, name, type, labelColor, value, style, attribute ,options }) {
//   return (
//     <div className="w-[100%] m-auto rounded-sm my-3">
//       {label ?
//         <label
//           className={`text-[0.8rem]  py-1 text-start ${labelColor ? labelColor : "text-blue-800"}`}
//           htmlFor={label}
//         >
//           {label}
//         </label>
//         : null
//       }

//       {type === "select" ? (
//         <Field
//           as="select"
//           name={name}
//           className={`h-[2.5rem] text-[18px] border-b-[1px] bg-transparent border-blue-950 rounded-sm w-[100%] outline-none ${style}`}
//           {...attribute}
//         >
//           <option value="">Select {name}</option>
//           {options?.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </Field>
//       ) : (


//         <Field
//           className={`h-[2.5rem] text-[18px] border-b-[1px] bg-transparent  border-blue-950 rounded-sm w-[100%] outline-none  ${style} `}
//           name={name}
//           autoComplete="off"
//           type={type}
//           value={value}
//           placeholder={`Enter ${name}`}
//           {...attribute}
//         />
//       )
//       }
//       <div className="text-red-500 h-3 text-xs">
//         <ErrorMessage name={name} />
//       </div>

//     </div>
//   )
// }




import { ErrorMessage, Field } from "formik";

export function TextInput({ label, name, type, labelColor, style, attribute, options }) {
  return (
    <div className="w-[100%] m-auto rounded-sm my-3">
      {label && (
        <label
          className={`text-[1rem] py-1  text-start ${labelColor ? labelColor : "text-white"}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {type === "select" ? (
        <Field
          as="select"
          name={name}
          className={`h-[2.5rem] text-[18px] border-b-[1px]  bg-white/30 backdrop-blur-md border-blue-950 rounded-lg px-2 w-[100%] outline-none ${style}`}
          {...attribute}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          className={`h-[2.5rem] text-[18px] border-[1px] bg-white/30 backdrop-blur-md border-blue-950 rounded-lg px-2 w-[100%] outline-none ${style}`}
          name={name}
          autoComplete="off"
          type={type}
          placeholder={`Enter ${label}`}
          {...attribute}
        />
      )}

      <div className="text-red-500 h-3 text-xs">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}








// import { ErrorMessage, Field } from "formik";

// export function TextInput({ label, name, type, labelColor, style, attribute, options }) {
//   return (
//     <div className="w-full m-auto rounded-sm my-3">
//       {label && (
//         <label
//           className={`text-[1rem] py-1 text-start ${labelColor || "text-black"}`}
//           htmlFor={name}
//         >
//           {label}
//         </label>
//       )}

//       {type === "select" ? (
//         <Field
//           as="select"
//           name={name}
//           className={`h-[2.5rem] text-[18px] border-b-[1px] bg-white/30 backdrop-blur-md border-blue-950 rounded-lg px-2 w-full outline-none ${style}`}
//           {...attribute}
//         >
//           <option value="">Select {label}</option>
//           {options?.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </Field>
//       ) : (
//         <Field
//           className={`h-[2.5rem] text-[18px] border-[1px] bg-white/30 backdrop-blur-md border-blue-950 rounded-lg px-2 w-full outline-none ${style}`}
//           name={name}
//           autoComplete="off"
//           type={type}
//           placeholder={`Enter ${label}`}
//           {...attribute}
//         />
//       )}

//       <div className="text-red-500 h-3 text-xs">
//         <ErrorMessage name={name} />
//       </div>
//     </div>
//   );
// }
