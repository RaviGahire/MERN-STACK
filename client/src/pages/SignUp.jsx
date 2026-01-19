import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        password: "",
        phone: "",
        email: "",
        city: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://127.0.0.1:5001/api/createuser", formData);

            alert("User Created Successfully");
            console.log("Form Submitted:", response);

            // Reset form after submission
            setFormData({
                firstname: "",
                lastname: "",
                password: "",
                phone: "",
                email: "",
                city: "",
            });

        } catch (error) {

            alert("Error creating user");
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mt-2">Join us by filling out the details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* First Name & Last Name (Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="firstname" className="text-sm font-semibold text-gray-700 ml-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="John"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="lastname" className="text-sm font-semibold text-gray-700 ml-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Doe"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-700 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Phone & City (Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="phone" className="text-sm font-semibold text-gray-700 ml-1">
                                Phone Number
                            </label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="1234567890"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="city" className="text-sm font-semibold text-gray-700 ml-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="New York"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-100 mt-4 active:scale-[0.98] cursor-pointer"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};