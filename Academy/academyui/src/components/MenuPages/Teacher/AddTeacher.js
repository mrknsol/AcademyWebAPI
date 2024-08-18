import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from '../../../redux/teacherSlice';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.teachers);

  const [teacherData, setTeacherData] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeacher(teacherData));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 p-4 border-b">Add New Teacher</h2>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={teacherData.name}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <input
              type="text"
              name="surname"
              value={teacherData.surname}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <input
              type="number"
              name="age"
              value={teacherData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <input
              type="email"
              name="email"
              value={teacherData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <input
              type="password"
              name="password"
              value={teacherData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={teacherData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-md px-2 py-1"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding...' : 'Add Teacher'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
