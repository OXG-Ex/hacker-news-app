import { useAppSelector } from '../../../store/hooks';
import { getComments } from '../../../store/newsData/newsDataReducer';
import Comment from './Comment/Comment';

const Comments = () => {
    const comments = useAppSelector(getComments);

    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} level={1} />
            ))}
        </div>
    );
};

export default Comments;
