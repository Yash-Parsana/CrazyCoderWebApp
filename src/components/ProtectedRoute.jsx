import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Error from './Error'

const ProtectedRoute = ({ children }) => {
    const authStatus = useSelector((state) => state.auth.status);

    return authStatus ? (
        <>{children}</>
    ) : (
        <Error errorTitle='Restricted Feature' errorMessage='You need to login to access this feature.' />
    );
};

export default ProtectedRoute;
