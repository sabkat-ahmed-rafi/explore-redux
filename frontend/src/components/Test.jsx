import React from 'react';
import { useSelector } from 'react-redux';

const Test = () => {

    const {user} = useSelector(state => state.auth)

    return (
        <div>
            ami {user?.email}
        </div>
    );
};

export default Test;