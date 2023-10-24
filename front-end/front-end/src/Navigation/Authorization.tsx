import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

import { CandidateProfile } from '../Pages/CandidateProfile';
import { Welcome } from '../Pages/Welcome';
import { Logout } from '../Pages/Logout';
import { Invite } from '../Pages/Invite';
import { Dashboard } from '../Pages/Dashboard';

import { store } from '../Services/Store';
import { Role } from '../Services/AuthenticationSlice';

export interface MMMenu {
    printMyself(): JSX.Element;
}

export interface MMSubMenu {
    name: string;
    subItems: MMMenuItem[];
}

export interface MMMenuItem {
    name: string;
    path: string;
    icon: JSX.Element;
    page: JSX.Element;
}

const NAVIGATION_ADMIN: MMMenuItem[] = [
    {
        name: 'Invite',
        path: 'invite',
        icon: <AddToHomeScreenIcon />,
        page: <Invite />,
    },
    {
        name: "Welcome",
        path: "welcome",
        icon: <SchoolOutlinedIcon />,
        page: <Welcome />,
    },
    {
        name: "Log out",
        path: "logout",
        icon: <LogoutIcon className="logoutIconStyle"/>,
        page: <Logout />,
    },    
]

const NAVIGATION_ASSOSICATION:MMMenuItem[] = [
    {
        name: "Invite",
        path: "invite",
        icon: <AddToHomeScreenIcon />,
        page: <Invite />,
    },
    {
        name: "Dashboard",
        path: "dashoard",
        icon: <SchoolOutlinedIcon />,
        page: <Dashboard />,
    },
    {
        name: "Welcome",
        path: "welcome",
        icon: <SchoolOutlinedIcon />,
        page: <Welcome />,
    },
    {
        name: "Log out",
        path: "logout",
        icon: <LogoutIcon className="logoutIconStyle"/>,
        page: <Logout />,
    },
];


const NAVIGATION_COMPANY:MMMenuItem[] = [
    {
        name: "Welcome",
        path: "welcome",
        icon: <SchoolOutlinedIcon />,
        page: <Welcome />,
    },
    {
        name: 'Log out',
        path: 'logout',
        icon: <LogoutIcon className="logoutIconStyle" />,
        page: <Logout />,
    },
];

const NAVIGATION_CANDIDATE: (MMMenuItem | MMSubMenu)[] = [
    {
        name: 'Welcome Back',
        subItems: [
            {
                name: 'Profile',
                path: 'profile',
                icon: <AccountCircleOutlinedIcon />,
                page: <CandidateProfile />,
            },
            {
                name: 'Log out',
                path: 'logout',
                icon: <LogoutIcon className="logoutIconStyle" />,
                page: <Logout />,
            },
        ],
    },
    {
        name: 'Welcome',
        path: 'welcome',
        icon: <SchoolOutlinedIcon />,
        page: <Welcome />,
    },
];

const NAVIGATION_LOGOUT: MMMenuItem[] = [
    {
        name: 'Log out',
        path: 'logout',
        icon: <LogoutIcon className="logoutIconStyle" />,
        page: <Logout />,
    },
];

export class Authorization {
    getMyMenu() {
        const userRole:Role = store.getState().auth.role;
        
        if(userRole === Role.Admin) {
            return NAVIGATION_ADMIN;
        } else if(userRole === Role.Candidate) {
            return NAVIGATION_CANDIDATE;
        } else if(userRole === Role.Association) {
            return NAVIGATION_ASSOSICATION;
        } else if(userRole === Role.Company) {
            return NAVIGATION_COMPANY;
        }
        return NAVIGATION_LOGOUT;
    }

    getMyRoutes() {
        const routes: MMMenuItem[] = [];
        const menu = this.getMyMenu();

        // flattens the menu for routing.. we don't need to know the structure
        menu.forEach((item: MMMenuItem | MMSubMenu) => {
            if ('subItems' in item) {
                item.subItems.forEach((subItem: MMMenuItem) => {
                    routes.push(subItem);
                });
            } else {
                routes.push(item);
            }
        });
        return routes;
    }

    getMyMainPage() {
        const userRole:Role = store.getState().auth.role;
        
        if(userRole === Role.Admin) {
            return <Invite />;
        } else if(userRole === Role.Association) {
            return <Invite />;
        } else if(userRole === Role.Candidate) {
            return <Welcome />;
        } else if(userRole === Role.Company) {
            return <Welcome />;
        }
        return <Logout />;
    }

    getInviteRoles() {
        return Object.values(Role).filter((role) => role !== Role.Non);
    }
}

export const authorization = new Authorization();