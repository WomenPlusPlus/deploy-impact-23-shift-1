import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

import { CandidateProfile } from '../Pages/CandidateProfile';
import { Welcome } from '../Pages/Welcome';
import { Logout } from '../Pages/Logout';
import { Invite } from '../Pages/Invite';

import { store } from '../Services/Store';
import { AuthenticationStatus } from '../Services/AuthenticationSlice';

export interface MMMenu {
    printMyself():JSX.Element
}

export interface MMSubMenu {
    name: string,
    subItems: MMMenuItem[],
}

export interface MMMenuItem {
    name: string,
    path: string,
    icon: JSX.Element,
    page: JSX.Element,
}

const NAVIGATION_ADMIN:MMMenuItem[] = [
    {
        name: "Invite",
        path: "invite",
        icon: <AddToHomeScreenIcon />,
        page: <Invite />,
    },
    {
        name: "Log out",
        path: "logout",
        icon: <LogoutIcon className="logoutIconStyle"/>,
        page: <Logout />,
    },    
]

const NAVIGATION_CANDIDATE:(MMMenuItem|MMSubMenu)[] = [
    {
        name: "Welcome Back",
        subItems: [
            {
                name: "Profile",
                path: "profile",
                icon: <AccountCircleOutlinedIcon />,
                page: <CandidateProfile />,
            },
            {
                name: "Log out",
                path: "logout",
                icon: <LogoutIcon className="logoutIconStyle"/>,
                page: <Logout />,
            },
        ],
    },
    {
        name: "Welcome",
        path: "welcome",
        icon: <SchoolOutlinedIcon />,
        page: <Welcome />,
    },
]

const NAVIGATION_LOGOUT:MMMenuItem[] = [
    {
        name: "Log out",
        path: "logout",
        icon: <LogoutIcon className="logoutIconStyle"/>,
        page: <Logout />,
    },
]

export class Navigation {
    getMyMenu() {
        const authenticationStatus:AuthenticationStatus = store.getState().auth.status;
        if(authenticationStatus === AuthenticationStatus.CandidateAuthenticated) {
            return NAVIGATION_CANDIDATE;
        } else if(authenticationStatus === AuthenticationStatus.AdminAuthenticated) {
            return NAVIGATION_ADMIN;
        }
        return NAVIGATION_LOGOUT;
    }

    getMyRoutes() {
       const routes:MMMenuItem[] = [];
       const menu = this.getMyMenu();

       // flattens the menu for routing.. we don't need to know the structure
       menu.forEach((item:MMMenuItem|MMSubMenu) => {
          if('subItems' in item) {
            item.subItems.forEach((subItem:MMMenuItem) => {
                routes.push(subItem);
            })
          } else {
            routes.push(item);
          }
       });
       return routes;
    }

    getMyMainPage() {
        const authenticationStatus:AuthenticationStatus = store.getState().auth.status;
        if(authenticationStatus === AuthenticationStatus.CandidateAuthenticated) {
            return <Welcome />;
        } else if(authenticationStatus === AuthenticationStatus.AdminAuthenticated) {
            return <Invite />;
        }
        return "/";
    }
}

export const navigation = new Navigation();