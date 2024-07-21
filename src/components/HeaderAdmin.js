import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router';
import { API_KEY } from '../utils/createAxios';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import axios from 'axios';

function HeaderAdmin() {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const user = localStorage.getItem('user');
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${API_KEY}/user/UserInfor?id=${user}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  useEffect(() => {
    showButton();
    fetchCartData();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/productAdmin' className='navbar-logo' onClick={closeMobileMenu}>
            Rèm Cửa Như Ý
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/productAdmin'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sản Phẩm
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cartadmin'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Đơn hàng
              </Link>
            </li>
            {user === null ? null :
              <li className='nav-item'>
                <Link
                  to='/customer'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Người dùng
                </Link>
              </li>
            }
          </ul>
          {user == null ?
            button && <Button buttonStyle='btn--outline' path='/sign-up'>Đăng nhập</Button> :
            button && <Menu menuButton={<div className="menu-button-container">
              <img src={data.uImg} alt="Menu" className="menu-button-img" />
            </div>} transition>
              <MenuItem className="menu-item">
                <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                  Thông tin cá nhân
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogoutClick} className="menu-item">Đăng xuất</MenuItem>
              <MenuItem className="menu-item">
                <Link to="/resetpass" style={{textDecoration : 'none', color : 'black'}}>
                  Thay đổi mật khẩu
                </Link>
              </MenuItem>
            </Menu>}
        </div>
      </nav>
    </>
  );
}

export default HeaderAdmin;