import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
         CImg, CHeaderNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import store from '../store';

const TheHeaderDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const jsonString = localStorage.getItem('loginUser');
  const loginUser = JSON.parse(jsonString);

  async function signOut() {
    try {
      await Auth.signOut();
      dispatch({type: 'set', loginUser: null });
      localStorage.removeItem("loginUser");
      localStorage.setItem('logoutStatus', 'You have logged out successfully.');
      history.push('/');
    } catch (error) {
      console.log('Error Signing Out ===> ', error);
    }
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={true}>
        <div className="">
          <CIcon name="cil-user" /> {loginUser && loginUser.firstname + ' ' + loginUser.lastname}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem >
          <CHeaderNavLink onClick={signOut}>
            <CIcon name="cil-account-logout" className="mfe-2" />
            Logout
          </CHeaderNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
