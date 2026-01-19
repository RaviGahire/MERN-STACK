import React from 'react'
import { Header } from '../components/Header'

export const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main className='min-h-screen bg-gray-200'>
                {children}
            </main>

        </>
    )
}
