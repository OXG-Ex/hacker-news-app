import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { loadPosts } from "../../sagas/newsSagaActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPosts } from "../../store/newsData/newsDataReducer";
import PostsList from "./PostsList/PostsList";
import ReloadButton from "./ReloadButton/ReloadButton";

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(getPosts);

    const updateNews = useCallback(() => dispatch(loadPosts()), [dispatch]);

    useEffect(() => {
        if (!posts.length) {
            updateNews();
        }
        // const interval = setInterval(updateNews, 60000);
        // return () => clearInterval(interval);
    }, [dispatch, posts, updateNews]);


    return <Container sx={{ paddingTop: "20px" }}>
        <ReloadButton onClick={updateNews} />
        <PostsList />
    </Container>;
};
