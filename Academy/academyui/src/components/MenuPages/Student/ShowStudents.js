import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent, setEditStudentId, clearEdit, updateStudent } from '../../../redux/studentSlice';

const ShowStudents = () => {
  const dispatch = useDispatch();
  const { students, editStudentId } = useSelector((state) => state.students);
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('loading');
    dispatch(fetchStudents())
      .unwrap()
      .then(() => {
        setStatus('succeeded');
      })
      .catch((err) => {
        setStatus('failed');
        setError(err);
      });
  }, [dispatch]);

  const handleDelete = (email) => {
    setStatus('loading');
    dispatch(deleteStudent(email))
      .unwrap()
      .then(() => {
        setStatus('succeeded');
      })
      .catch((err) => {
        setStatus('failed');
        setError(err);
      });
  };

  const handleEdit = (student) => {
    if (student && student.user) {
      dispatch(setEditStudentId(student.id));
      setFormValues({
        name: student.user.name || '',
        surname: student.user.surname || '',
        email: student.user.email || '',
      });
    } else {
      console.error("Student data is undefined", student);
    }
    console.log(student.user.name, student.user.surname);
  };

  const handleCancelEdit = () => {
    dispatch(clearEdit());
  };

  const handleSaveEdit = () => {
    setStatus('loading');
    dispatch(updateStudent({ ...formValues }))
      .unwrap()
      .then(() => {
        setStatus('succeeded');
        dispatch(clearEdit());
      })
      .catch((err) => {
        setStatus('failed');
        setError(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 p-4 border-b">Student List</h2>
        <div className="p-4">
          {status === 'loading' && <p>Loading students...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {students.length > 0 ? (
            <ul>
              {students.map((student) => (
                <li key={student.user.email} className="flex justify-between items-center p-2 border-b">
                  <div className="flex-1">
                    {editStudentId === student.id ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                        />
                        <input
                          type="text"
                          name="surname"
                          value={formValues.surname}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          readOnly
                          className="border border-gray-300 rounded-md px-2 py-1 bg-gray-200 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold">{student.user.name} {student.user.surname}</span>
                        <span className="text-sm text-gray-600 ml-2">{student.user.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editStudentId === student.id ? (
                      <div>
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(student.user.email)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No students available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowStudents;