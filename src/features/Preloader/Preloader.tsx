import { Paper, CircularProgress, Snackbar, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getIsLoading } from "../../store/newsData/newsDataReducer";

export type PreloaderProps = {
    text?: string;
};

export const Preloader: React.FC<PreloaderProps> = ({ text }) => {
    const isNewsLoading = useAppSelector(getIsLoading);

    return <Snackbar open={isNewsLoading} transitionDuration={1000} anchorOrigin={{ horizontal: "center", vertical: "top" }} >
        <Paper sx={{ padding: "10px" }}>
            <Stack direction={"row"} gap={"10px"}>
                <CircularProgress size={32} />
                <Typography variant="h5">
                    {text || 'Loading...'}
                </Typography>
            </Stack>
        </Paper>
    </Snackbar>;
};
