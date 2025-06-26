import React from "react"
import { Link, NavLink, } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, } from "react-icons/fa";
import { FaLink, FaLocationDot } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles


const Footer = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);

 
  return (
    <section className="bg-[#000000] py-8 scrollbar-hide">
      <div className="w-11/12 mx-auto">
        {/* Contact Items */}
        <div className="flex flex-wrap justify-between border-b-2 border-gray-500 pb-4" >
          
          {/* Call Us */}
          <div className="w-52 py-4">
            <h3 className="flex items-center uppercase text-white text-lg" >
              <FaPhone className="text-fuchsia-500 mr-3" /> Call Us
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-700 my-4" ></div>
            <div>
              <p className="text-gray-400 text-sm">
                <span className="text-white">Phone:  </span> +91-7678295963
              </p>
              {/* <p className="text-gray-400 text-sm">
                <span className="text-white">Phone:  </span> +91-8595152392
              </p> */}
            </div>
          </div>

          {/* Address */}
          <div className="w-52 py-4">
            <h3 className="flex items-center uppercase text-white text-lg" >
              <FaLocationDot className="text-fuchsia-500 mr-3" /> Address
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-700 my-4" ></div>
            <div>
              <p className="text-gray-400 text-sm">
                <span className="text-white">Location: </span>
                Tirkha colony Ballabgarh Faridabad
              </p>
              <p className="text-gray-400 text-sm">(Delhi NCR) Haryana</p>
            </div>
          </div>

          {/* Mail Us */}
          <div className="w-64 py-4">
            <h3 className="flex items-center uppercase text-white text-lg" >
              <FaEnvelope className="text-fuchsia-500 mr-3" /> Mail Us
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-700 my-4" ></div>
            <div>
              <p className="text-gray-400 text-sm">
                <span className="text-white">Gmail 1: </span>tamorkhushi@gmail.com
              </p>
              {/* <p className="text-gray-400 text-sm">
                <span className="text-white">Gmail 2: </span>aakumar66333@gmail.com
              </p> */}
            </div>
          </div>

          {/* Office */}
          <div className="w-52 py-4">
            <h3 className="flex items-center uppercase text-white text-lg" >
              <FaGlobe className="text-fuchsia-500 mr-3" /> Link
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-700 my-4" ></div>
            <div>
              
              <NavLink to={"/"}><p className="text-gray-400 text-sm">
                <span className="text-white">👉🏻 </span>Home
              </p>
              </NavLink>
              <NavLink to={"/leads"}><p className="text-gray-400 text-sm">
                <span className="text-white">👉🏻 </span> Leads
              </p>
              </NavLink>
              <NavLink to={"/projects"}><p className="text-gray-400 text-sm">
                <span className="text-white">👉🏻 </span> login
              </p>
              </NavLink>
              <NavLink to={"/education"}><p className="text-gray-400 text-sm">
                <span className="text-white">👉🏻 </span> signUp
              </p>
              </NavLink>
              
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center flex flex-wrap justify-center md:justify-between px-4 rounded-lg text-sm lg:text-[17px] text-[#000000] font-semibold py-1 md:py-4 bg-white mt-4 ">
          <div>© 2025 All Rights Reserved Terms of Use and Privacy Policy</div>
          <div>This Website Developed By Khushi</div>
        </div>
      </div>
    </section>
  );
};

export default Footer;