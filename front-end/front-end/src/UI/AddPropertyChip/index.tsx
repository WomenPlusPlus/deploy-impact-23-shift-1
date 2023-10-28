import { styled } from '@mui/material/styles';
import Chip, { ChipProps } from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Add from './add.png';

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
    color: '#2196F3',
    fontWeight: 500,
}));

const AddIcon = () => (
    <Box ml={1} mr={-1}>
        <img src={Add} width={18} height={18} alt="" />
    </Box>
);

const AddPropertyChip: typeof Chip = (props: any) => (
    <StyledChip {...props} icon={<AddIcon />} variant="outlined" />
);

export default AddPropertyChip;
