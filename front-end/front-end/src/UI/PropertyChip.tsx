import { styled } from '@mui/material/styles';
import Chip, { ChipProps } from '@mui/material/Chip';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
    color: '#49454FCC',
    fontWeight: 500,
    borderWidth: '2px',
    borderColor: '#39C1BD',
    '&:hover': {
        borderColor: '#39C1BD',
    },
}));

const PropertyChip: typeof Chip = (props: any) => (
    <StyledChip variant="outlined" {...props} />
);

export default PropertyChip;
