import { Box } from '@mui/material';
import LogoLong from '../assets/MM_logo_long.png';

export const Footer = () => {
    return (
        <>
            <Box sx={{ mt: 5 }} className="textStyle" >
                <div>Do you have issues to create your profile?</div>
            </Box>
            <Box>
                <a className="linkStyle" href= "mailto:{process.env.REACT_APP_SUPPORT_EMAIL}">Contact support team</a>
            </Box>
            
            <Box sx={{ mt: 7 }} className="textStyle" >Powered by</Box>
            <Box sx={{ mt: 2 }} >
                <img src={LogoLong} alt="" loading="lazy" width="244px" />        
            </Box>
             
        </>
    );
}