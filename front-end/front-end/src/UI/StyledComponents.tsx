import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const RoundedTextField = styled(TextField)(({ theme }) => ({
    color: "rgba(34, 34, 34, 0.90)",
    fontFamily: "Outfit",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "normal",
    width: 300,
}));
