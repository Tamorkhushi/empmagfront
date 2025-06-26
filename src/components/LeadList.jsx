import React, { useEffect } from 'react';
import { useFetchLeads } from '../hooks/useFetch';
import { toast } from 'react-toastify';
import { deleteData, postData } from '../utils/apiCall';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../libs/zustand';
import LeadCard from './LeadCard';

const LeadList = () => {
  const { userleads, refetch } = useFetchLeads()

  const { token } = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
    
    // Redirect to login if the user is not logged in
    if (!token) {
      toast.warn("Please login to access this page");
      navigate("/login");
    }
  }, [token, navigate])


  const deleteLead = async (id) => {
    try {

      const response = deleteData(`/api/users/lead/delete_leads/${id}`);
      toast.promise(
        response,
        {
          pending: 'Lead deleting...',
          success: 'Lead is deleted 👌',
          error: 'something went wrong.. 🤯',
        }
      );
      const data = await response;
      console.log("data is ", data);

      if (data.success) {
        console.log("hello");
        refetch()
      }

    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("There was an error deleting the lead", error);
    }
  };

  console.log("userleads rohit kumar listlead", userleads);
  const leads = []
  return (
    <>
      <h3 className="text-2xl sm:text-4xl font-semibold text-center pt-12 pb-6 text-blue-900 uppercase">List of lead</h3>
      <div className=" flex justify-center items-center flex-wrap gap-6 ">

        {userleads?.map((lead) => (
          // <LeadCard key={lead.id} lead={lead}  />
          <LeadCard key={lead._id} lead={lead} onDelete={deleteLead} />
        ))}
      </div>
      <div className='m-auto w-full flex justify-center'>
        
        <Link to="/lead_management">
          <button className="px-6 py-3 my-12 mx-auto items-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition duration-300" >
            Create new lead
          </button>
        </Link>
      </div>
    </>
  )
}

export default LeadList;
