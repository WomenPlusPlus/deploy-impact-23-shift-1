import { authentication } from "../Services/Authentication";
import "../Styles/Styles.css"

export const Welcome = () => {    
    return (
        <div className="pageFrameLayout pageFrameStyle">
            Welcome {authentication.getMyRole()}!
        </div>
    );
}