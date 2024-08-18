import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import signUpUser from '../models/SignUpUser';

const RegisterForm = () => {
    const [user, setUser] = useState(new signUpUser());
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        console.log(user)
        await dispatch(registerUser(user)).unwrap();
        navigate('/login');
      } catch (err) {
        console.error("Registration failed:", err);
        alert("Registration failed: " + err.message);
      }
    };

    return (
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
              <div>
                  <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
                  <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
              </div>
              <div>
                  <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
                  <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
              </div>
          </div>

          <form onSubmit={handleRegister} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
              <div className="mb-6">
                  <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
              </div>

              {error && <p className="text-red-600 mb-4">{error}</p>}

              <div className="space-y-6">
                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Name</label>
                      <input
                          type="text"
                          name="Name"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Enter name"
                          value={user.Name}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Surname</label>
                      <input
                          type="text"
                          name="Surname"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Enter surname"
                          value={user.Surname}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Age</label>
                      <input
                          type="number"
                          name="Age"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Enter age"
                          value={user.Age}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Email</label>
                      <input
                          type="email"
                          name="Email"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Enter email"
                          value={user.Email}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Password</label>
                      <input
                          type="password"
                          name="Password"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Enter password"
                          value={user.Password}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div>
                      <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                      <input
                          type="password"
                          name="ConfirmPassword"
                          required
                          className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                          placeholder="Confirm password"
                          value={user.ConfirmPassword}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div className="flex items-center">
                      <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                          I accept the <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                      </label>
                  </div>
              </div>

              <div className="!mt-12">
                  <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                      Create an account
                  </button>
              </div>

              <Link to="/login">
                  <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
              </Link>
          </form>
      </div>
  </div>
    );
};

export default RegisterForm;