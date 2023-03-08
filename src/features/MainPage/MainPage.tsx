import { Container, Fab, Snackbar } from "@mui/material";
import { useCallback, useEffect } from "react";
import UpdateIcon from '@mui/icons-material/Update';
import { loadNews } from "../../sagas/newsSagaActions";
import { useAppDispatch } from "../../store/hooks";
import NewsList from "./NewsList/NewsList";

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const updateNews = useCallback(() => dispatch(loadNews()), [dispatch]);

    useEffect(() => {
        updateNews();
        const interval = setInterval(updateNews, 60000);
        return () => clearInterval(interval);
    }, [dispatch, updateNews]);


    return <Container sx={{ paddingTop: "20px" }}>
        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={true}
            transitionDuration={1000}
        >
            <Fab color="primary" aria-label="Update news" onClick={updateNews}>
                <UpdateIcon />
            </Fab>
        </Snackbar>
        <NewsList />
    </Container>;
};
