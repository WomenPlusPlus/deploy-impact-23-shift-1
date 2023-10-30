import Icon from './assets/shield_person.png';
import ImagePlaceholder from './assets/img_placeholder.png';
import { SectionDescriptionCard } from './shared/SectionDescriptionCard';
import { SectionCard } from './shared/SectionCard';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '../../UI/Button';
import IsVisibleIcon from '../../UI/IsVisibleIcon';
import SuccessChip from '../../UI/SuccessChip';

type MainInfoItemProps = {
    title: string;
    value: string;
    isVisible: boolean;
};

const MainInfoItem = ({ title, value, isVisible }: MainInfoItemProps) => {
    const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible);
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box
                flex={1}
                minWidth={0}
                color={isVisibleLocal ? '#000000de' : '#3e3b43a9'}
            >
                <Typography variant="caption" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    gutterBottom
                >
                    {value}
                </Typography>
            </Box>
            <Stack direction="row" flexWrap="nowrap" alignItems="center">
                <IsVisibleIcon isVisible={isVisibleLocal} />
                <Button
                    onClick={() => setIsVisibleLocal(!isVisibleLocal)}
                    sx={{ ml: 1 }}
                >
                    Edit
                </Button>
            </Stack>
        </Stack>
    );
};

type LegalSectionItemProps = {
    title: string;
    isAccepted: boolean;
};

const LegalSectionItem = ({ title, isAccepted }: LegalSectionItemProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
        >
            <Box flex={1} minWidth={0}>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    gutterBottom
                >
                    {title}
                </Typography>
            </Box>
            <Stack direction="row" flexWrap="nowrap" alignItems="center">
                {isAccepted && <SuccessChip label="Accepted" />}
                {/* <Button onClick={() => {}} sx={{ ml: 1 }}>
                    Edit
                </Button> */}
            </Stack>
        </Stack>
    );
};

export const PersonalInfo = ({ data }: { data: any }) => {
    return (
        <>
            <SectionDescriptionCard
                title="Personal details"
                description="These are your personal details shown to users in the app."
                imgSrc={Icon}
            />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <img
                    src={ImagePlaceholder}
                    alt=""
                    loading="lazy"
                    width="60px"
                    height="60px"
                />
                <Button>Upload Photo</Button>
            </Stack>
            <SectionCard>
                <Stack spacing={2}>
                    <MainInfoItem
                        title="Name"
                        value={data?.user?.name}
                        isVisible={true}
                    />
                    <MainInfoItem
                        title="Preffered Name"
                        value={data?.user?.preffered_name}
                        isVisible={true}
                    />
                    <MainInfoItem
                        title="Email"
                        value={data?.user?.email}
                        isVisible={true}
                    />
                    <MainInfoItem
                        title="Phone number"
                        value={data?.user?.phone_number}
                        isVisible={true}
                    />
                </Stack>
            </SectionCard>
            <SectionCard>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                        About me
                    </Typography>
                    <Button>Edit</Button>
                </Stack>
                <Typography variant="body2" gutterBottom>
                    {data?.user?.description}
                </Typography>
            </SectionCard>
            <SectionCard>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Legal
                </Typography>
                <LegalSectionItem
                    title="Terms & conditions"
                    isAccepted={data?.user?.terms_and_conditions}
                />
                <LegalSectionItem
                    title="Privacy policy"
                    isAccepted={data?.user?.privacy_policy}
                />
            </SectionCard>
        </>
    );
};
