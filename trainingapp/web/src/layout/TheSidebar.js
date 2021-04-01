import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CNavItem,
  CProgress,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from '../_nav';
import logo from '../assets/images/logo.png'
import logo_small from '../assets/images/logo_small.png'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/" style={{background:"#ced2d8"}}>
        <CIcon
          className="c-sidebar-brand-full"
          src={logo}
          height={45}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          src={logo_small}
          width={35}
        />
      </CSidebarBrand>
      <CSidebarNav >

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />

        <CSidebarNavDivider />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
