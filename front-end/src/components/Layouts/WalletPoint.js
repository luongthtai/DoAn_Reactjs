import React from 'react'

export default function WalletPoint() {
    return (
        <section className='bg-white rounded border grid p-4 font-semibold text-sm' >
            <h3 className='border-dashed border-b-2 py-2 text-lg'>Wallet Points</h3>

            <div className='flex justify-center gap-5 py-4'>
                <div className='text-center border-dashed border-r-2 pr-5'>
                    <p>0</p>
                    <p>Total</p>
                </div>

                <div className='text-center border-dashed border-r-2 pr-5'>
                    <p>0</p>
                    <p>Used</p>
                </div>

                <div className='text-center border-dashed'>
                    <p>0</p>
                    <p>Available</p>
                </div>
            </div>
        </section>
    )
}
