import { Card, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { getTopLevelComments } from '../../../store/newsData/newsDataReducer';
import Comment from './Comment/Comment';
import { CommentSkelleton } from './Comment/CommentSkelleton';

const Comments = () => {
    const comments = useAppSelector(getTopLevelComments);

    const commentNodes = comments.map((comment) => (
        <Comment key={comment.id} comment={comment} level={0} />
    ));

    return (
        <Card sx={{ pb: "26px", width: "fill-available" }}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ pl: "10px" }}>
                <Typography variant='h6' color="primary.main" sx={{ pt: "10px" }}>Comments</Typography>
                {comments.length ? commentNodes : <CommentSkelleton />}
            </Stack>
        </Card>
    );
};

export default Comments;
