import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ChangeThemes from './ChangesThemes';

const Navbar = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(true);
  const element = document.getElementById('root');

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      element?.requestFullscreen({ navigationUI: 'auto' });
    }
  }, [element, isFullScreen]);

  return (
    // navbar screen
    <div className="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
      {/* container */}
      <div className="flex gap-3 items-center">
        {/* navbar logo */}
        <Link to={'/profile'} className="flex items-center gap-1 xl:gap-2">
          <div className="w-24 xl:w-30 2xl:w-48">
            <img
              src="/logo.png"
              alt="logo"
            />
          </div>
        </Link>
      </div>

      {/* navbar items to right */}
      <div className="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
        {/* theme */}
        <div className="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
          <ChangeThemes />
        </div>

        {/* avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
          <div className="w-9 rounded-full">
            <img
              src="/Portrait_Placeholder.png"
              alt="portrait"
            />
          </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          >
            <Link to={'/profile'}>
              <li>
                <a className="justify-between">프로필</a>
              </li>
            </Link>
            <li onClick={() => navigate('/')}>
              <a>로그아웃</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
