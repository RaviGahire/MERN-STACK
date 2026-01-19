import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MainLayout } from "../layout/MainLayout"
import { SignUp } from "../pages/SignUp"
import { About } from "../pages/About"
import { EditUser } from "../pages/EditUser"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
import { useEffect, useState } from "react"
import { ProtectedRoute } from "../components/ProtectedRoute"
import axios from "axios"

export const AppRoutes = () => {

    //for protected routes
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setLoading(false)
            return
        }

        axios.get(`http://127.0.0.1:5001//api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {

            const userdata = res.data.data
            setUser(userdata)

        }).catch((err) => {
            localStorage.removeItem('token')
            setUser(null)
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
 

    }, [])

    // console.log('user decode data from approute', user)

    return (
        <>
            <Router>
                <MainLayout >
                    <Routes>
                        <Route path="/" element={<><h1>Home Page</h1></>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/edit" element={<EditUser />} />
                        <Route path="/dashboard" element={<ProtectedRoute user={user} loading={loading} allowedRoles={["user"]}><Dashboard /></ProtectedRoute>} />
                        <Route path="/unathorized" element={<><h1>You dont have permission to access this page</h1></>}></Route>
                        {/* Auth routes */}
                        <Route path="/login" element={<Login userData={setUser} />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </MainLayout>
            </Router>
        </>

    )
}
