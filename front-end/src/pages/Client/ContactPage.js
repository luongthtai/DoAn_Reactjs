import React from 'react'
import contactImg from 'assets/image/contact-img.svg'
import { Link } from 'react-router-dom'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'

export default function ContactPage() {
    return (
        <>
            <main className='bg-gray-100 min-h-screen pt-16 pb-10 lg:pb-auto px-8'>
                <section className='container m-auto py-14 flex gap-6 flex-col-reverse md:flex-row max-w-screen-xl'>
                    <aside className='grid gap-6 md:w-1/3 w-full bg-white p-4'>
                        <img
                            src={contactImg}
                            alt='contact-img'
                            className='w-full object-contain'
                        />

                        <div className='grid gap-2'>
                            <label className='font-semibold'>Address</label>
                            <p className='text-slate-500 text-sm'>NY, United States</p>
                        </div>

                        <div className='grid gap-2'>
                            <label className='font-semibold'>Phone</label>
                            <p className='text-slate-500 text-sm'>+ 82834538680</p>
                        </div>

                        <div className='grid gap-2'>
                            <label className='font-semibold'>Website</label>
                            <div className='flex justify-between'>
                                <p className='text-slate-500 text-sm'>http://tai.io</p>
                                <Link className='text-emerald-500 font-semibold text-sm outline-none'>Visit This site</Link>
                            </div>
                        </div>
                        
                        <div className='grid gap-2'>
                            <label className='font-semibold'>Follow</label>
                            <div className='flex gap-4 text-xl text-slate-500'>
                                <AiFillFacebook />
                                <AiOutlineInstagram />
                                <AiOutlineTwitter /> 
                            </div>
                        </div>
                    </aside>

                    <article className='md:w-2/3 w-full bg-white p-5'>
                        <h2 className='text-2xl font-bold mb-4'>Questions, Comments, Or Concerns?</h2>

                        <form className='grid gap-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='name'>Name</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' />
                                </div>

                                <div>
                                    <label htmlFor='email'>Email</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='email' type='email' id='email' />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='subject'>Subject</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='subject' id='subject' type='text' />
                            </div>

                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea className='border rounded py-2 w-full outline-emerald-500 px-3' name='description' />
                            </div>

                            <button className='text-white rounded py-2 px-4 bg-emerald-600 w-fit'>Submit</button>
                        </form>
                    </article>
                </section>
            </main>
        </>
    )
}
