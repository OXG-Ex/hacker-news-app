import { Stack, Skeleton } from "@mui/material";

export const CommentSkelleton: React.FC = () => {
    return <Stack
        direction={'column'}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "fill-available", pr: '10px' }}>
        <Stack direction={'row'}
            alignItems="center"
            spacing={2}
            sx={{ p: "16px", width: "fill-available" }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: "220px" }} />
        </Stack>

        <Skeleton variant="rectangular" sx={{ width: "fill-available" }} height={60} />
    </Stack>;
}

