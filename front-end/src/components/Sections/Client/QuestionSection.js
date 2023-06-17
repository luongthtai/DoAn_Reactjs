import React from 'react'
import QuestionItem from '../../Layouts/QuestionItem'

export default function QuestionSection() {
    return (
        <section className='bg-white p-8 border rounded'>
            <h3 className='text-lg font-bold text-center'>My Questions</h3>

            <div className='grid gap-5 mt-10'>
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
            </div>

            <div className='text-center mt-5'>
                <button className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white w-fit' type='button'>Load More</button>
            </div>
        </section>
    )
}
