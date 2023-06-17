import React from 'react'
import DownloadItem from '../../Layouts/DownloadItem'

export default function DownloadSection() {
    return (
        <section className='bg-white p-8 border rounded'>
            <h3 className='text-lg font-bold text-center'>Downloads</h3>

            <div className='grid gap-5 mt-10'>
                <DownloadItem />
                <DownloadItem />
                <DownloadItem />
                <DownloadItem />
            </div>
        </section>
    )
}
