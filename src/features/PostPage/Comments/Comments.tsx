import { Card, Stack } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { getTopLevelComments } from '../../../store/newsData/newsDataReducer';
import Comment from './Comment/Comment';
import { CommentSkelleton } from './Comment/CommentSkelleton';

const Comments = () => {
    const comments = useAppSelector(getTopLevelComments);

    return (
        <Card sx={{ pb: "26px" }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>

                {comments.length ? comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} level={0} />
                )) : <CommentSkelleton />}
            </Stack>
        </Card>
    );
};

export default Comments;
