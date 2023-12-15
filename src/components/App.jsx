import React from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { checkAuth } from "../store/auth/actions";
import { getIsAuth } from "../store/auth/selectors";
import ImagePopup from './ImagePopup';

function App() {
  const dispatch = useDispatch();
  const [tooltipStatus, setTooltipStatus] = React.useState();
  const closeInfoTooltip = () => setTooltipStatus();
  const isLoggedIn = useSelector(getIsAuth);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const modal = location.state && location.state.background;

  return (
    <div className='page__content'>
      <Header />
      <Routes location={modal || location}>
        <Route path="/gallery/*" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }/>
        <Route path='/signup' element={
          <>
            {isLoggedIn && <Navigate to='/gallery' />}
            <Register setTooltip={setTooltipStatus} />
          </>
        }/>
        <Route path='/signin' element={
          <>
            {isLoggedIn && <Navigate to='/gallery' />}
            <Login setTooltip={setTooltipStatus} />
          </>
        } />
        <Route path='/card/:id' element={
          <ImagePopup onClose={() => navigate('/')}/>
        } />
        <Route path='*' element={
          <>
            {isLoggedIn ? <Navigate to='/gallery' /> : <Navigate to='/signin' />}
          </>
        } />
      </Routes>
      <Footer />
      <Routes>
        <Route path='/(signup|signin)' element={
          <>
            {!!tooltipStatus && (<InfoTooltip
                onClose={closeInfoTooltip}
                status={tooltipStatus}
            />)}
          </>
        } />
      </Routes>

      {modal && (
        <Routes>
          <Route path='/card/:id' element={
            <ImagePopup onClose={() => navigate(-1)}/>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
