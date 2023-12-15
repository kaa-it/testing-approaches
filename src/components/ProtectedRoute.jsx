import React from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Preloader from './Preloader';
import { useSelector } from "react-redux";

import { getIsAuth, getIsAuthChecking } from "../store/auth/selectors";


const ProtectedRoute = ({children}) => {
  const isLoggedIn = useSelector(getIsAuth);
  const isChecking = useSelector(getIsAuthChecking);

  return (
    <>
      { isChecking ? (
        <main className='content'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ? children : <Navigate to="/signin" />
      )}
    </>
)}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
}

export default ProtectedRoute;