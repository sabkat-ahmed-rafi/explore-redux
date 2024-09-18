import React from 'react';
import { useSelector } from 'react-redux'
import { useGetAllDataQuery } from '../apiSlices/apiSlice';

const Home = () => {

    const {user, loading} = useSelector((state) => state.auth)
    const {data: allData, isLoading, error} = useGetAllDataQuery()

    console.log(allData)

    return (
        <>
            {loading ? 'loading.....' : <h1 className='text-center text-3xl'>hello {user?.email}</h1>}


            {
                isLoading ?
                <p>loading Bhiya.....</p> : 
                <section className='mt-10 flex gap-8 m-10'>
                {
                    allData.map(data => <div className='border p-3 rounded-md' key={data._id}>
                        <p>{data.company}</p>
                    </div>)
                }
            </section>
            }

        </>
    );
};

export default Home;