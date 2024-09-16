import React from 'react';
import { createUser } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

   const handleCreateUser = (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    console.log(email, password)
    const newUser = { email, password }
    
    try{
        const result = dispatch(createUser(newUser)).unwrap()
        console.log(result)
        navigate('/')
    } catch (error) {
        console.log(error.message)
    }

   }


    return (
        <>
            <section>

            <h1 className='py-8 text-4xl text-center'>Sign up</h1>
            
            <form onSubmit={handleCreateUser} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label name="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
</form>


            </section>
        </>
    );
};

export default SignUp;