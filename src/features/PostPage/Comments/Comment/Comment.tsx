import { Avatar, Typography, CardHeader, Box, Link } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { ApiItemModel } from '../../../../models/ApiItemModel';
import { loadChildComments } from '../../../../sagas/newsSagaActions';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getChildComments } from '../../../../store/newsData/newsDataReducer';
import { CommentSkelleton } from './CommentSkelleton';

export type CommentProps = {
    comment: ApiItemModel;
    level: number;
};

const Comment: React.FC<CommentProps> = ({ comment, level }) => {
    const dispatch = useAppDispatch();
    const [showReplies, setShowReplies] = useState(false);

    const comments = useAppSelector(getChildComments);

    const handleShowReplies = useCallback(() => {
        dispatch(loadChildComments(comment?.id));//TODO: Optimize to not make call for each open/close
        setShowReplies(!showReplies);
    }, [comment?.id, dispatch, showReplies]);

    if (!comment) {
        return <CommentSkelleton />;
    }
    const { by, text, kids } = comment;

    return (
        <Box sx={{ pl: '30px', mt: '10px', width: "fill-available", borderLeft: level > 0 ? "1px solid" : undefined, borderLeftColor: "primary.main" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }} >
                        {by[0]}
                    </Avatar>
                }
                title={by}
            />
            <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: text }} sx={{ pr: "10px" }} />
            {kids && (
                <Link onClick={handleShowReplies} sx={{ cursor: "pointer" }}>{!showReplies ? `Show ${kids.length} replie(s)` : "Hide replie(s)"}</Link>
            )}
            {showReplies &&
                kids.map((kidId) => (
                    <Comment key={kidId} comment={comments.find((c) => c.id === kidId) as ApiItemModel} level={level + 1} />
                ))}
        </Box>
    );
};

export default Comment;
