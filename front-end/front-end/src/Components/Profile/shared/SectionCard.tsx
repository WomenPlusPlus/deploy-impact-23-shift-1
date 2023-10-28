import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

export const SectionCard = ({ children }: { children?: React.ReactNode }) => (
    <Card variant="outlined">
        <Box p={1.5}>{children}</Box>
    </Card>
);
