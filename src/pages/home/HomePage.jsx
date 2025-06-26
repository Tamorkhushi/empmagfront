import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className=" h-auto sm:h-[89vh] py-8 sm:py-12 flex justify-center items-center text-white font-sans">
        <div className="text-center p-0 sm:p-8 m-auto w-[100%] sm:w-[95%] md:w-[90%]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4  bg-gradient-to-r from-fuchsia-500 to-purple-700 bg-clip-text text-transparent">
            Welcome to the Lead Management System
          </h1>
          <p className="text-lg mb-6 text-gray-700">
            A powerful platform for managing, tracking, and organizing your leads efficiently.
          </p>
          <Link to="/lead_management">
            <button className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-700 hover:bg-gradient-to-l hover:from-fuchsia-600 hover:to-purple-800  text-white font-semibold rounded-lg shadow-lg transition duration-300">
              Create Lead
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
