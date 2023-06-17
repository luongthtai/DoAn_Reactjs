import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Dashboard from '../../../pages/Admin/Dashboard'

export default function MainAdmin() {
    const location = useLocation()

    return (
        <section className='w-full p-8 bg-gray-100'>
            {
                location.pathname === '/admin' ? <Dashboard /> : <Outlet />
            }
        </section>
    )
}
