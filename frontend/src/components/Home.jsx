import React from 'react';
import { useSelector } from 'react-redux'

const Home = () => {

    const {user, loading} = useSelector((state) => state.auth)
    console.log(user)

    return (
        <>
            {loading ? 'loading.....' : <h1>hello {user?.email}</h1>}
        </>
    );
};

export default Home;