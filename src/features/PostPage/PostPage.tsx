import { Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadTopLevelComments } from "../../sagas/newsSagaActions";
import { useAppDispatch } from "../../store/hooks";
import { cleanComments } from "../../store/newsData/newsDataReducer";
import Comments from "./Comments/Comments";

const PostPage = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams();

    useEffect(() => {
        dispatch(cleanComments());
        dispatch(loadTopLevelComments(+(postId as string)));
    }, [dispatch, postId]);

    return <div>
        {postId}
        <Container sx={{ paddingTop: "20px" }}>
            <Comments />
        </Container>

    </div>;
};

export default PostPage;
