import WalletPoint from 'components/Layouts/WalletPoint'
import ListLinkProfile from 'components/Sections/Client/ListLinkProfile'
import ProfileSection from 'components/Sections/Client/ProfileSection'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProfilePage() {
    const isLogin = useSelector(state => state.auth.isLogin)

    const location = useLocation()

    if (isLogin) {
        return (
            <>
                <main className='bg-gray-50 pt-16 px-8 overflow-y-scroll h-screen'>
                    <div className='container m-auto py-10 flex gap-4 items-start'>
                        <aside className='w-1/4 hidden gap-4 lg:grid'>
                            <WalletPoint />
                            <ListLinkProfile />
                        </aside>

                        <article className='lg:w-3/4 w-full pb-10 lg:pb-auto'>
                            {
                                location.pathname === '/profile' ? <ProfileSection /> : <Outlet />
                            }
                        </article>
                    </div>
                </main>
            </>
        )
    }

    return <Navigate to='/' />
}
