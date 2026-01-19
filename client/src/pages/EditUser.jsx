import { useLocation } from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EditUser = () => {

    const [editUser, setEditUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        city: ""
    });

    const nav = useNavigate()

    const location = useLocation();

    const { userId } = location.state || {};

    const findUsers = async () => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:5001/api/users/${userId}`
            );

            setEditUser(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userId) {
            findUsers();
        }
    }, [userId]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:5001/api/users/${userId}`, editUser);

            alert("User updated successfully");

            nav('/about');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Edit User
                </h2>

                <form onSubmit={ handleSubmit} method="POST" className="space-y-4">
                    {/* First Name & Last Name (Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={editUser.firstname}
                                onChange={handleChange}

                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={editUser.lastname}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editUser.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Phone (Number) */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={editUser.phone}
                            onChange={handleChange}

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={editUser.city}
                            onChange={handleChange}

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-semibold shadow-sm"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}
