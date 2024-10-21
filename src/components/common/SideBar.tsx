import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import React, { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom';

interface SideBarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

interface SideBarItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd }: SideBarProps) => {
  const drawerItems: SideBarItem[] = [
    { text: 'Home', path: '/', icon: HomeIcon },
    { text: 'Report', path: '/report', icon: QueryStatsIcon },
  ];

  const baseLinkStyle:CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  };

  const activeLinkStyle:CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerItems.map((item, index) => (
          <NavLink to={item.path} key={index} style={({ isActive }) => {
            return {
              ...baseLinkStyle,
              ...(isActive ? activeLinkStyle : {}),
            }
          }}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box
    component="nav"
    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    aria-label="mailbox folders"
  >
    {/* モバイルメニュー */}
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>

    {/* PCメニュー */}
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>

  )
}

export default SideBar