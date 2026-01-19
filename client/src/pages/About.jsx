import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const About = () => {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    // Fetch user data from API when component mounts
    const fetchUserData = async () => {
        try {
            const allUsersData = await axios.get('http://127.0.0.1:5001/api/users')

            const data = allUsersData.data.data

            setUserData(data)

        } catch (error) {

            console.log(error)


        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5001/api/users/${id}`);

            // Update the userData state to remove the deleted user
            setUserData(userData.filter(user => user._id !== id));


        } catch (error) {
            console.log(error)

        }



    }

    const updateUser = async (id) => {
        try {

            // For demonstration, we'll just log the action. In a real app, you'd navigate to an edit page or open a modal.
            alert(`Update user with ID: ${id}`);
            navigate('/edit', { state: { userId: id } });

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => { fetchUserData() }, []);




    return (
        <div className="p-6">
            <h1>User data</h1>
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* Example Row */}
                        {userData.map((user, index) => (
                            <tr key={index} className='bg-zinc-200/70'>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastname || '--'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center space-x-2">
                                        {/* Edit Icon Button */}
                                        <button onClick={() => { updateUser(user._id) }} title="Edit User" className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>

                                        {/* Delete Icon Button */}
                                        <button onClick={() => deleteUser(user._id)} title="Delete User" className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
