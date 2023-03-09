import { Card, Stack } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { getTopLevelComments } from '../../../store/newsData/newsDataReducer';
import Comment from './Comment/Comment';

const Comments = () => {
    const comments = useAppSelector(getTopLevelComments);

    return (
        <Card>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} level={0} />
                ))}
            </Stack>

        </Card>
    );
};

export default Comments;
