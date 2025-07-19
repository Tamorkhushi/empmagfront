// import { AiOutlineClockCircle, AiOutlineMail } from "react-icons/ai";
// import { FaUser } from "react-icons/fa";
// import { FiPhone, FiTrash2 } from "react-icons/fi";
// import { HiClipboardList } from "react-icons/hi";
// import { BiRefresh } from "react-icons/bi";
// import { useNavigate } from 'react-router-dom';

// const LeadCard = ({ lead, onDelete }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-gradient-to-r from-cyan-50 to-blue-100 p-2 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl w-[95%] sm:w-[35rem]">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <FaUser className="text-blue-600" size={24} />
//           <h3 className="text-sm sm:text-xl font-semibold text-blue-900 uppercase">{lead.name}</h3>
//         </div>
//         <span
//           className={`px-3 py-1 text-sm font-semibold rounded-full ${lead.status === "New"
//             ? "bg-green-100 text-green-700"
//             : lead.status === "Contacted"
//               ? "bg-yellow-100 text-yellow-700"
//               : "bg-red-100 text-red-700"
//             }`}
//         >
//           {lead.status}
//         </span>
//       </div>

//       {/* Lead Info Section */}
//       <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
//         <div className="flex items-center gap-3">
//           <AiOutlineMail className="text-blue-600" size={20} />
//           <p className="text-blue-700 truncate">{lead.email}</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <FiPhone className="text-blue-600" size={20} />
//           <p className="text-blue-700">{lead.phoneNumber || "N/A"}</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <HiClipboardList className="text-blue-600" size={20} />
//           <p className="text-gray-700 font-medium">Lead ID: {lead._id || "N/A"}</p>
//           {/* <p className="text-gray-700 font-medium">User ID: {lead.userId || "N/A"}</p> */}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mt-6">
//         <div className='text-[0.75rem] w-full'>
//           <div className="flex items-center gap-3">
//             {lead?.createdAt && (
//               <div className="flex items-center gap-2">
//                 <AiOutlineClockCircle className="text-blue-600 text-[0.75rem]" size={20} />
//                 <p className="text-blue-700">createdAt: {new Date(lead.createdAt).toLocaleString()}</p>
//               </div>
//             )}

//           </div>
//           <div className="flex items-center gap-3">
//             {lead?.createdAt && (
//               <div className="flex items-center gap-2">
//                 <BiRefresh className="text-blue-600 " size={20} />
//                 <p className="text-blue-700">updatedAt: {new Date(lead.updatedAt).toLocaleString()}</p>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className='flex w-full gap-4 justify-end '>

//           <button
//             onClick={() => navigate("/lead_management", { state: { leadData: lead } })}
//             className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 sm:px-4 h-[2.5rem] sm:h-[2.7rem] rounded-lg hover:from-blue-600 hover:to-blue-800 shadow-lg flex items-center gap-2 transition-all"
//           >
//             <BiRefresh size={18} />
//             Update
//           </button>
//           <button
//             onClick={() => onDelete(lead._id)}
//             className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 sm:px-4 h-[2.5rem] sm:h-[2.7rem] rounded-lg hover:from-red-600 hover:to-red-800 shadow-lg flex items-center gap-2 transition-all"
//           >
//             <FiTrash2 size={18} />
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LeadCard;







import { AiOutlineClockCircle, AiOutlineMail } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FiPhone, FiTrash2 } from "react-icons/fi";
import { HiClipboardList } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const LeadCard = ({ lead, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-100 p-2 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl w-[95%] sm:w-[35rem]">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <FaUser className="text-blue-600" size={24} />
          <h3 className="text-sm sm:text-xl font-semibold text-blue-900 uppercase">{lead.name}</h3>
        </div>
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            lead.status === "New"
              ? "bg-green-100 text-green-700"
              : lead.status === "Contacted"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {lead.status}
        </span>
      </div>

      {/* Lead Info Section */}
      <div className="flex gap-4 items-center">
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-3">
            <AiOutlineMail className="text-blue-600" size={20} />
            <p className="text-blue-700 truncate">{lead.email || "N/A"}</p>
          </div>

          <div className="flex items-center gap-3">
            <FiPhone className="text-blue-600" size={20} />
            <p className="text-blue-700">{lead.phoneNumber || "N/A"}</p>
          </div>

          <div className="flex items-center gap-3">
            <HiClipboardList className="text-blue-600" size={20} />
            <p className="text-gray-700 font-medium">Lead ID: {lead._id || "N/A"}</p>
          </div>
        </div>

        {/* Avatar Image */}
        <div>
          {lead?.avatar && (
            <img
              src={`${apiUrl}/uploads/${lead.avatar}`}
              alt="Lead Avatar"
              crossOrigin="anonymous"
              className="w-24 h-24 object-cover z-50 rounded-full mb-4"
            />
          )}
        </div>
      </div>

      {/* Action Buttons & Timestamps */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mt-6">
        <div className='text-[0.75rem] w-full'>
          <div className="flex items-center gap-3">
            {lead?.createdAt && (
              <div className="flex items-center gap-2">
                <AiOutlineClockCircle className="text-blue-600 text-[0.75rem]" size={20} />
                <p className="text-blue-700">Created: {new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {lead?.updatedAt && (
              <div className="flex items-center gap-2">
                <BiRefresh className="text-blue-600" size={20} />
                <p className="text-blue-700">Updated: {new Date(lead.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className='flex w-full gap-4 justify-end'>
          <button
            onClick={() => navigate("/lead_management", { state: { leadData: lead } })}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 sm:px-4 h-[2.5rem] sm:h-[2.7rem] rounded-lg hover:from-blue-600 hover:to-blue-800 shadow-lg flex items-center gap-2 transition-all"
          >
            <BiRefresh size={18} />
            Update
          </button>
          <button
            onClick={() => onDelete(lead._id)}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-3 sm:px-4 h-[2.5rem] sm:h-[2.7rem] rounded-lg hover:from-red-600 hover:to-red-800 shadow-lg flex items-center gap-2 transition-all"
          >
            <FiTrash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;

