import Chip from '@mui/material/Chip';

type Props = {
    label: string;
};

const SuccessChip = ({ label }: Props) => (
    <Chip
        label={label}
        sx={{ backgroundColor: '#39C1BD66', borderRadius: '8px' }}
    />
);

export default SuccessChip;
