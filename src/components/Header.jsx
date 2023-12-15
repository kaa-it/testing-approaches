import React, { useState } from "react";
import logoPath from "../images/logo.svg";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserData } from "../store/auth/selectors";
import { signOut } from "../store/auth/actions";

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const {email} = useSelector(getUserData) || {};

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleSignOut = () => dispatch(signOut());

  const isMain = useMatch({path: "/", end: true});

  return (

    <header
      className={`header page__section 
         ${isMenuOpen ? "header_menu-open" : ""} 
         ${isMain ? "header_page-main" : ""}`}
    >
    <Link className='header__auth-link' to=''>
      <img
        src={logoPath}
        alt='Логотип проекта Mesto'
        className='logo header__logo'
      />
      </Link>
      <Routes>
        <Route path='/gallery/' element={
          <>
            <button
              className='header__burger'
              type='button'
              aria-label='меню'
              onClick={toggleMenu}
            ></button>
            <div className='header__wrapper'>
              <p className='header__user'>{email}</p>
              <button className='header__logout' onClick={handleSignOut}>
                Выйти
              </button>
            </div>
          </>
        } />
        <Route path='/signup' element={
          <Link className='header__auth-link' to='/signin'>
            Войти
          </Link>
        } />
        <Route path='/signin' element={
          <Link className='header__auth-link' to='/signup'>
            Регистрация
          </Link>
        } />
      </Routes>
    </header>
  );
}

export default Header;
