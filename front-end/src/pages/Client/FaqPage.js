import React from 'react'

export default function FaqPage() {
    return (
        <>
            <main className='bg-gray-50 pt-16 h-screen px-8'>
                <div className='grid gap-3 container m-auto pt-10 max-w-screen-lg'>
                    <h2 className='text-3xl font-bold text-center my-5'>FAQ</h2>

                    <div tabIndex={0} className="collapse collapse-plus border rounded-sm bg-white">
                        <div className="collapse-title text-xl font-medium">
                            How to contact with Customer Service?
                        </div>
                        <div className="collapse-content">
                            <p>Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border rounded-sm bg-white">
                        <div className="collapse-title text-xl font-medium">
                            App installation failed, how to update system information?
                        </div>
                        <div className="collapse-content">
                            <p>Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border rounded-sm bg-white">
                        <div className="collapse-title text-xl font-medium">
                            Website response taking time, how to improve?
                        </div>
                        <div className="collapse-content">
                            <p>At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border rounded-sm bg-white">
                        <div className="collapse-title text-xl font-medium">
                            How do I create a account?
                        </div>
                        <div className="collapse-content">
                            <p>If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes.</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
