import { Box } from '@mui/material';
import LogoXS from '../assets/MM_logo_xs.png';
import LogoWPP from '../assets/women++_logo.png';

export const Header = () => {
    return (
        <>
            <Box sx={{ mt: 15 }} >
                <img src={LogoWPP} alt="" loading="lazy" width="81px" />
            </Box>
            <Box sx={{ mt: 5 }} className="textStyle" >
                You’ve been invited by 
                <a className="linkStyle" href= "mailto:{process.env.REACT_APP_SUPPORT_EMAIL}">women++</a> 
                to open a profile on  
                <Box
                component="img"
                sx={{
                    height: 20,
                    ml: 1 
                }}
                src={LogoXS} alt=""
                />
            </Box>
        </>
    );
}