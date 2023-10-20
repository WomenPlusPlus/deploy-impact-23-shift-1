import { Link } from "react-router-dom";

import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu
} from "react-pro-sidebar";

import { navigation, MMMenuItem, MMSubMenu } from "./Menu";
import "./SideBar.css"

export const SideBar = () => {
  const menuItems = navigation.getMyMenu();
  return (
    <div className="sideBarLayout sideBarStyle">
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
  );
};

const MMSubMenuComponent = ({name, subItems}: MMSubMenu) => {
  return (    
    <SubMenu className="subMenuItemLayout subMenuItemStyle"              
      icon={<img  className="imageLayout imageStyle"
              src="https://profileme.app/wp-content/uploads/2021/01/cropped-ProfileMe-06.jpg"
              alt=""
              />}
      label={name}
    >
      { subItems.map((subItem:MMMenuItem):JSX.Element => (<MMMenuItemComponent {...subItem}/>)) }
    </SubMenu>
  )
};  

const MMMenuItemComponent = ({name, path, icon}: MMMenuItem) => {
  return (
    <MenuItem className="menuItemLayout menuItemStyle"
      component={<Link to={path}/>}
      icon={icon}
      >
        {name}
    </MenuItem>
  )
};