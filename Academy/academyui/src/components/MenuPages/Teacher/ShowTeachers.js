import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers, updateTeacher, setEditTeacherId, setEditedTeacher, deleteTeacher, clearEdit } from '../../../redux/teacherSlice';

const ShowTeachers = () => {
  const dispatch = useDispatch();
  const { teachers, editTeacherId, editedTeacher, error, status } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleEditClick = (teacher) => {
    dispatch(setEditTeacherId(teacher.id));
    dispatch(setEditedTeacher(teacher));
  };

  const handleSaveClick = () => {
    if (editedTeacher.user.name && editedTeacher.user.surname && editedTeacher.user.email) {
      dispatch(updateTeacher(editedTeacher))
    } else {
      console.error("All Fields have to fulfilled!!");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedTeacher({ ...editedTeacher, user: { ...editedTeacher.user, [name]: value } }));
  };

  const handleDeleteClick = (teacher) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      dispatch(deleteTeacher(teacher));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 p-4 border-b">Teachers List</h2>
        <div className="p-4">
          {status === 'loading' && <p className="text-gray-700">Loading teachers...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {teachers.length === 0 && status !== 'loading' && (
            <p className="text-gray-700">No teachers found.</p>
          )}
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex-1">
                {editTeacherId === teacher.id ? (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="name"
                      value={editedTeacher.user.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="text"
                      name="surname"
                      value={editedTeacher.user.surname}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="number"
                      name="age"
                      value={editedTeacher.user.age}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editedTeacher.user.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                      disabled
                    />
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                      onClick={handleSaveClick}
                      disabled={status === 'loading'}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                      onClick={() => dispatch(clearEdit())}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {teacher.user.name} {teacher.user.surname}
                    </p>
                    <p className="text-gray-700">Age: {teacher.user.age}</p>
                    <p className="text-gray-700">Email: {teacher.user.email}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editTeacherId !== teacher.id && (
                  <button
                    className="text-purple-500 hover:text-purple-700 transition-colors"
                    onClick={() => handleEditClick(teacher)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 13l9 9 9-9M15 4h6a2 2 0 012 2v6M5 4h6M5 4l3 3M5 4v6m14-6v6M15 4l3 3" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDeleteClick(teacher)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13H5l7-7 7 7zM5 21h14M5 10h14" />
                    </svg>
                  </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowTeachers;
