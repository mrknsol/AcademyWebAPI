import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../redux/groupSlice';
import { fetchTeachers } from '../../../redux/teacherSlice';

const CreateGroup = () => {
    const [groupData, setGroupData] = useState({
        name: '',
        countOfStudents: '',
        teacherEmail: '',
    });
    const dispatch = useDispatch();

    const teachers = useSelector((state) => state.teachers.teachers);
    const teachersStatus = useSelector((state) => state.teachers.status);

    useEffect(() => {
        if (teachersStatus === 'idle') {
            dispatch(fetchTeachers());
        }
    }, [teachersStatus, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGroup(groupData));
    };

    console.log("Teachers:", teachers); // Логирование данных учителей

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-6">Create Group</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
                    <input 
                        type="text" 
                        id="groupName" 
                        value={groupData.name} 
                        onChange={(e) => setGroupData({ ...groupData, name: e.target.value })} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="countOfStudents" className="block text-sm font-medium text-gray-700">Count Of Students</label>
                    <input 
                        type="number" 
                        id="countOfStudents" 
                        value={groupData.countOfStudents} 
                        onChange={(e) => setGroupData({ ...groupData, countOfStudents: e.target.value })} 
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-700">Teacher</label>
                    <select
                        id="teacherEmail"
                        value={groupData.teacherEmail}
                        onChange={(e) => setGroupData({ ...groupData, teacherEmail: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    >
                        <option value="" disabled>Select a teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.user.email} value={teacher.user.email}>
                                {teacher.user.name} {teacher.user.surname}
                            </option>
                        ))}
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Create Group
                </button>
            </form>
        </div>
    );
};

export default CreateGroup;