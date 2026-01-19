import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const Login = ({ userData }) => {

    const [data, setData] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        const logindata = { ...data, [name]: value }
        setData(logindata)
    }

    const nav = useNavigate()

    const handleSubmit = async (e) => {
        try {

            e.preventDefault()

            const res = await axios.post(`http://127.0.0.1:5001/api/login`, {
                email: data.email,
                password: data.password
            });

            //get token from the response
            const token = res.data.token
            // set token in localstorage
            localStorage.setItem('token', token)
            //decode the token using jwt decode pakage
            const decoded_token = jwtDecode(token)
            //passed props from routes and accessed 
            userData(decoded_token)
            console.log(decoded_token)

            //navigate to page 
            nav('/dashboard')

            alert('User login successfully')
            //empty the prev data
            setData({
                email: "",
                password: ""
            })

        } catch (error) {
            alert('Invalid credentials')
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">Welcome Back</h1>
                    <p className="text-gray-500 mb-8 text-sm text-center">Please enter your details to sign in.</p>

                    <form method="post" className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100 mt-2 active:scale-[0.98]"
                        >
                            Sign In
                        </button>

                        {/* Sign Up Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don’t have an account?{' '}
                            <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
