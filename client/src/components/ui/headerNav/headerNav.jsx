import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../layout';
import { Cart } from '../../ui';
import { ThemeToggle } from '../../../utils/helpers';
import { useAuth, useModal } from '../../../hooks';
import NavButton from './navButton/navButton';
import PostAdLink from './postAdLink/postAdLink';
import { SunIcon, MoonIcon, UserIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';

function HeaderNav() {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem('color-theme') === 'light');

  const handleToggleTheme = () => {
    ThemeToggle();
    if (localStorage.getItem('color-theme') === 'light') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  const handleUserIcon = () => {
    if (!currentUser) {
      return showModal({ title: 'Sing in', closable: true, content: <Login /> });
    }
    navigate('cabinet/personal-data');
  };

  return (
    <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium">
      <li>
        <NavButton onClick={handleToggleTheme}>
          {isDark ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </NavButton>
      </li>
      <li>
        <NavButton onClick={handleUserIcon}>
          <UserIcon className="w-5 h-5" />
        </NavButton>
      </li>
      {currentUser && (
        <>
          <li>
            <NavButton onClick={() => navigate('/cabinet/wishlist')}>
              <HeartIcon className="w-5 h-5" />
            </NavButton>
          </li>

          <li>
            <NavButton onClick={() => showModal({ title: 'Cart', closable: true, content: <Cart /> })}>
              <ShoppingCartIcon className="w-5 h-5" />
            </NavButton>
          </li>
        </>
      )}
      <li>
        <PostAdLink />
      </li>
    </ul>
  );
}

export default HeaderNav;
