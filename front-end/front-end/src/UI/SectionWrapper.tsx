import { Card, Grid, Stack } from "@mui/material";

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <Grid item sm={12} md={4}>
        <Card variant="outlined" sx={{ padding: 2 }}>
            <Stack spacing={2}>{children}</Stack>
        </Card>
    </Grid>
);