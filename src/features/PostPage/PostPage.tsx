import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadComments } from "../../sagas/newsSagaActions";
import { useAppDispatch } from "../../store/hooks";
import { cleanComments } from "../../store/newsData/newsDataReducer";
import Comments from "./Comments/Comments";

const PostPage = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams();

    useEffect(() => {
        dispatch(cleanComments);
        dispatch(loadComments(+(postId as string)));
    }, [dispatch, postId]);

    return <div>
        {postId}
        <Comments />
    </div>;
};

export default PostPage;
