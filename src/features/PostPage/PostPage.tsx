import { Container, Stack } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadPostById, loadTopLevelComments } from "../../sagas/newsSagaActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cleanComments, getSelectedPost } from "../../store/newsData/newsDataReducer";
import PostItem from "../MainPage/PostsList/PostItem/PostItem";
import ReloadButton from "../ReloadButton/ReloadButton";
import Comments from "./Comments/Comments";

const PostPage = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams();

    const id = +(postId as string);
    const post = useAppSelector(getSelectedPost);
    const updateComments = useCallback(() => dispatch(loadTopLevelComments(id)), [dispatch, id]);

    useEffect(() => {
        if (!post) {
            dispatch(loadPostById(id));
        }
        dispatch(cleanComments());
        updateComments();
    }, [dispatch, id, post, updateComments]);

    if (!post) {
        return null;
    }

    return <Container sx={{ pt: "20px" }}>
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <PostItem post={post} isPostsPage={true} />
            {post?.kids?.length && <Comments />}
        </Stack>

        <ReloadButton onClick={updateComments} />
    </Container>;
};

export default PostPage;
