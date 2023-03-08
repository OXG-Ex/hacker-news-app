import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { loadNews } from "../../sagas/newsSagaActions";
import { useAppDispatch } from "../../store/hooks";
import NewsList from "./NewsList/NewsList";

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const updateNews = useCallback(() => dispatch(loadNews()), [dispatch]);

    useEffect(() => {
        updateNews();
        const interval = setInterval(updateNews, 60000);
        return () => clearTimeout(interval);
    }, [dispatch, updateNews]);


    return <Container sx={{ paddingTop: "20px" }}>
        <NewsList />
    </Container>;
};
