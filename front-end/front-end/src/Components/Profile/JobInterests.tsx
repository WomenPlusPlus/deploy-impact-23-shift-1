import Stack from '@mui/material/Stack';
import Icon from './assets/interests.png';
import { SectionDescriptionCard } from './shared/SectionDescriptionCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../../UI/Button';
import LogoXS from '../assets/MM_logo_xs.png';
import Properties from './shared/Properties';

export const JobInterests = ({ data }: { data: any }) => {
    return (
        <>
            <SectionDescriptionCard
                title="Job interests"
                description="These interests prioritize jobs matching them."
                imgSrc={Icon}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box flex={1} minWidth={0}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        gutterBottom
                    >
                        Search jobs
                    </Typography>
                    <Typography
                        variant="caption"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        gutterBottom
                    >
                        Let us work for you.
                    </Typography>
                </Box>
                <Button onClick={() => {}} sx={{ ml: 1 }}>
                    <img src={LogoXS} alt="" loading="lazy" width="35px" />{' '}
                    <Typography ml={1}>Match me</Typography>
                </Button>
            </Stack>

            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Industry'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.industry}
                    onAddProperty={() => {}}
                    addButtonLabel="Add industry"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Values'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.values}
                    onAddProperty={() => {}}
                    addButtonLabel="Add value"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Work type'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.workType}
                    onAddProperty={() => {}}
                    addButtonLabel="Add work type"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Size'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.companySize}
                    onAddProperty={() => {}}
                    addButtonLabel="Add company size"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Benefits'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.benefits}
                    onAddProperty={() => {}}
                    addButtonLabel="Add benefits"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Notice period'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.noticePeriod}
                    onAddProperty={() => {}}
                    addButtonLabel="Add notice period"
                />
            </Box>
            <Box>
                <Typography variant="caption" gutterBottom>
                    {'Top 3 references (companies, humans, books, etc.)'}
                </Typography>
                <Properties
                    properties={data?.jobInterests?.references}
                    onAddProperty={() => {}}
                    addButtonLabel="Add references"
                />
            </Box>
        </>
    );
};
