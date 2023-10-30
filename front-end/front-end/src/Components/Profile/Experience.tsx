import Typography from '@mui/material/Typography';
import Icon from './assets/home_repair_service.png';
import { SectionDescriptionCard } from './shared/SectionDescriptionCard';
import { SectionCard } from './shared/SectionCard';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PropertyChip from '../../UI/PropertyChip';
import AddPropertyChip from '../../UI/AddPropertyChip';
import Properties from './shared/Properties';

export const Experience = ({ data }: { data: any }) => {
    return (
        <>
            <SectionDescriptionCard
                title="Professional experience"
                description="These are the professional details shown to users in the app."
                imgSrc={Icon}
            />
            <SectionCard>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Linked apps
                </Typography>
                <Stack spacing={2}>Linkedin</Stack>
            </SectionCard>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Expertise in'}
                </Typography>
                <Properties
                    properties={data?.expertises}
                    onAddProperty={() => {}}
                    addButtonLabel="Add expertise"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Experience'}
                </Typography>
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Languages'}
                </Typography>
            </Box>
        </>
    );
};
