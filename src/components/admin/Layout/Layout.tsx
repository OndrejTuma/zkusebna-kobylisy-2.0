import ExitIcon from '@mui/icons-material/PowerSettingsNew'
import { MenuItem } from '@mui/material'
import React, { useContext } from 'react'
import { AppBar, Layout as RALayout, useLogout, UserMenu, LayoutProps } from 'react-admin'

import { AuthContext } from '../Auth'

const MyLogoutButton = () => {
  const { logOut } = useContext(AuthContext)
  const logout = useLogout()
  const handleClick = () => {
    logOut()
    logout()
  }

  return (
    <MenuItem onClick={handleClick}>
      <ExitIcon/> Odhlásit
    </MenuItem>
  )
}

const MyUserMenu = () => (
  <UserMenu>
    <MyLogoutButton/>
  </UserMenu>
)

const MyAppBar = () => (
  <AppBar userMenu={<MyUserMenu/>}/>
)

const Layout = (props: LayoutProps) => {
  return (
    <RALayout appBar={MyAppBar} {...props}/>
  )
}

export default Layout