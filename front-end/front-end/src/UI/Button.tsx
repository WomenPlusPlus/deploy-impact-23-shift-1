import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: 500,
    color: '#948AF4',
    borderColor: '#948AF4',
    borderRadius: '8px',
    backgroundColor: '#F0EFFA',
    '&:hover': {
        backgroundColor: '#F0EFFA',
        borderColor: '#948AF4',
    },
}));

const DefaultButton: typeof Button = (props: any) => (
    <StyledButton variant="outlined" {...props} />
);

export default DefaultButton;
