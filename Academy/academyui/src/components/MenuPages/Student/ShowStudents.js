import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, updateStudent, setEditStudentId, setEditedStudent, clearEdit } from '../../../redux/studentSlice';

const ShowStudents = () => {
  const dispatch = useDispatch();
  const { students, editStudentId, editedStudent, error, status } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleEditClick = (student) => {
    dispatch(setEditStudentId(student.id));
    dispatch(setEditedStudent(student));
  };

  const handleSaveClick = () => {
    dispatch(updateStudent(editedStudent));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedStudent({ ...editedStudent, user: { ...editedStudent.user, [name]: value } }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 p-4 border-b">Student List</h2>
        <div className="p-4">
          {status === 'loading' && <p className="text-gray-700">Loading students...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {students.length === 0 && status !== 'loading' && (
            <p className="text-gray-700">No students found.</p>
          )}
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex-1">
                {editStudentId === student.id ? (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="name"
                      value={editedStudent.user.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="text"
                      name="surname"
                      value={editedStudent.user.surname}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="number"
                      name="age"
                      value={editedStudent.user.age}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editedStudent.user.email}
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
                      {student.user.name} {student.user.surname}
                    </p>
                    <p className="text-gray-700">Age: {student.user.age}</p>
                    <p className="text-gray-700">Email: {student.user.email}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editStudentId !== student.id && (
                  <button
                    className="text-purple-500 hover:text-purple-700 transition-colors"
                    onClick={() => handleEditClick(student)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 13l9 9 9-9M15 4h6a2 2 0 012 2v6M5 4h6M5 4l3 3M5 4v6m14-6v6M15 4l3 3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowStudents;