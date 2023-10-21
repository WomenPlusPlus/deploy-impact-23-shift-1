import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: () => ({
                    borderRadius: 8,
                }),
            },
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
