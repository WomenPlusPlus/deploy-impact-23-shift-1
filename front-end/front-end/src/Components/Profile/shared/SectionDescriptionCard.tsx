import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionCard } from './SectionCard';

type Props = {
    title: string;
    description: string;
    imgSrc: string;
};

export const SectionDescriptionCard = ({
    title,
    description,
    imgSrc,
}: Props) => (
    <SectionCard>
        <Box display="flex" alignItems="center">
            <Box mr={0.5} flex={1}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {description}
                </Typography>
            </Box>
            <img
                src={imgSrc}
                alt=""
                loading="lazy"
                width="48px"
                height="48px"
            />
        </Box>
    </SectionCard>
);
