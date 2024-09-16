import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '../slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebase.init';

const Root = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(setLoading(true));

        // Define a function for handling auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(setUser(user ? {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            } : null));
            
            dispatch(setLoading(false));
        });

        
        return () => {
            unsubscribe();
            dispatch(setLoading(false));
        };
    }, [dispatch]);

    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </>
    );
};

export default Root;