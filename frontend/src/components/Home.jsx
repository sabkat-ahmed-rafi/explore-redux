import { useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { useDeleteDataMutation, useGetAllDataQuery } from '../apiSlices/apiSlice';
import UpdateModal from './UpdateModal';



const Home = () => {

    const modalRef = useRef()
    const {user, loading} = useSelector((state) => state.auth)
    const {data: allData, isLoading, error} = useGetAllDataQuery()
    const [deleteData] = useDeleteDataMutation()
    const [dataId, setDataId] = useState()

    console.log(allData)


    const handleDeleteData = async (id) => {
        try{
            await deleteData(id).unwrap()
        } catch(err) {
            console.log(err)
        }
    }

   const openUpdateModal = (id) => {
     setDataId(id)
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    return (
        <>
            {loading ? 'loading.....' : <h1 className='text-center text-3xl mt-10'>hello {user?.email}</h1>}


            {
                isLoading ?
                <p>loading Bhiya.....</p> : 
                <section className='my-10 flex flex-wrap gap-8 m-10'>
                {
                    allData?.map(data => <div className='border p-3 rounded-md space-y-3' key={data._id}>
                        <p className='font-bold'>{data.email}</p>
                        <p>{data.phone}</p>
                        <p>{data.company}</p>
                        <p>{data.firstName}</p>
                        <p>{data.lastName}</p>
                        <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => handleDeleteData(data._id)}>Delete</button>
                        <button onClick={() => openUpdateModal(data._id)} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' type="button">Update</button>
                    </div>)
                }
            </section>
            }
            <UpdateModal modalRef={modalRef} dataId={dataId} />
            

        </>
    );
};

export default Home;