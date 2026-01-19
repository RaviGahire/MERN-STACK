import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserProfile } from '../pages/UserProfile'

export const ProtectedRoute = ({ user, loading, allowedRoles, children }) => {

    //step - 1
    if (loading) {
        return <h1>Loading</h1>
    }

    if (!user) {
        return <Navigate to='/login' />
    }

    if (allowedRoles && !allowedRoles.includes(user.userRole)) {
        return <Navigate to={'/unathorized'} />
    }


    return children;

    return (
        <>




        </>
    )
}
