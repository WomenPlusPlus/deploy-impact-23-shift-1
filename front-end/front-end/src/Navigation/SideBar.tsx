import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { authorization, MMMenuItem, MMSubMenu } from './Authorization';
import './SideBar.css';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));

export const SideBar = () => {
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

  const menuItems = authorization.getMyMenu();
  return (
    <>
        <Box>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 1, ...(open && { display: 'none' }) }}
                >
                <MenuIcon />
            </IconButton>
        </Box>
        <Drawer
            sx={{
                width: open ? `${drawerWidth}px` : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: `${drawerWidth}px`,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            >
            <div className="sideBarLayout sideBarStyle">                        
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Sidebar>
                <Menu className="menuLayout">
                    { menuItems.map((item:MMMenuItem|MMSubMenu):JSX.Element => (
                        <>
                        { 'subItems' in item ? 
                            (<MMSubMenuComponent {...item}/>) 
                            : (<MMMenuItemComponent {...item}/>) 
                        }
                    </>
                    ))}
                </Menu>
                <div className="logoFrameLayout logoFrameStyle">
                    <img className="logoLayout logoStyle"
                        src={process.env.REACT_APP_APP_URL + "/LogoLong.png"}
                        alt=""
                    />
                </div>
            </Sidebar>
            </div>
        </Drawer>
    </>          
  );
};

const MMSubMenuComponent = ({ name, subItems }: MMSubMenu) => {
    return (
        <SubMenu
            className="subMenuItemLayout subMenuItemStyle"
            icon={
                <img
                    className="imageLayout imageStyle"
                    src="https://profileme.app/wp-content/uploads/2021/01/cropped-ProfileMe-06.jpg"
                    alt=""
                />
            }
            label={name}
            key={name}
        >
            {subItems.map(
                (subItem: MMMenuItem): JSX.Element => (
                    <MMMenuItemComponent {...subItem} />
                )
            )}
        </SubMenu>
    );
};

const MMMenuItemComponent = ({ name, path, icon }: MMMenuItem) => {
    return (
        <MenuItem
            className="menuItemLayout menuItemStyle"
            component={<Link to={path} />}
            icon={icon}
            key={name}
        >
            {name}
        </MenuItem>
    );
};
