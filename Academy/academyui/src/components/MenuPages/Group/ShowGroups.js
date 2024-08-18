import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, updateGroup, setEditGroupId, setEditedGroup, deleteGroup, clearEdit } from '../../../redux/groupSlice';

const ShowGroups = () => {
  const dispatch = useDispatch();
  const { groups, editGroupId, editedGroup, error, status } = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleEditClick = (group) => {
    dispatch(setEditGroupId(group.id));
    dispatch(setEditedGroup(group));
  };

  const handleSaveClick = () => {
    dispatch(updateGroup(editedGroup));
  };

  const handleDeleteClick = (group) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      dispatch(deleteGroup(group));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedGroup({ ...editedGroup, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 p-4 border-b">Groups List</h2>
        <div className="p-4">
          {status === 'loading' && <p className="text-gray-700">Loading groups...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {groups.length === 0 && status !== 'loading' && (
            <p className="text-gray-700">No groups found.</p>
          )}
          {groups.map((group) => (
            <div key={group.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex-1">
                {editGroupId === group.id ? (
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="name"
                      value={editedGroup.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                    <input
                      type="number"
                      name="countOfStudents"
                      value={editedGroup.countOfStudents}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-2 py-1"
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
                      {group.name}
                    </p>
                    <p className="text-gray-700">Students: {group.countOfStudents}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editGroupId !== group.id && (
                  <div>
                    <button
                      className="text-purple-500 hover:text-purple-700 transition-colors"
                      onClick={() => handleEditClick(group)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 3.232a1 1 0 011.415 0l4.12 4.12a1 1 0 010 1.415l-10 10a1 1 0 01-.308.205l-5 2a1 1 0 01-1.308-1.308l2-5a1 1 0 01.205-.308l10-10zM7 13h4v1H7v-1zM11 7v4h-1V7h1z" />
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleDeleteClick(group)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowGroups;