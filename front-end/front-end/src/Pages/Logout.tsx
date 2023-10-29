import "../Styles/Styles.css"

import { authentication } from "../Services/Authentication";

export const Logout = () => {    
    authentication.logOut();
    
    return (
        <div className="pageFrameLayout pageFrameStyle">
            Logged out.
        </div>
    );
}