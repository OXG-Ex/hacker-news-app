import { Avatar, Typography, CardHeader, Box, Link } from '@mui/material';
import { sanitize } from 'dompurify';
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
        dispatch(loadChildComments(comment?.id));
        setShowReplies(!showReplies);
    }, [comment?.id, dispatch, showReplies]);

    if (!comment) {
        return <CommentSkelleton />;
    }

    const { by, text, kids, deleted } = comment;

    return (
        <Box sx={{ pl: '30px', mt: '10px', width: "fill-available", borderLeft: level > 0 ? "1px solid" : undefined, borderLeftColor: "primary.main" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "primary.main" }} >
                        {by?.[0]}
                    </Avatar>
                }
                title={by}
                sx={{ pl: 0 }}
            />
            {!deleted
                ? <Typography
                    variant="body2"
                    color="text.secondary"
                    //Use dompurify to clean comment text from dangerous HTML (XSS attacks and so on)
                    dangerouslySetInnerHTML={{ __html: sanitize(text) }}
                    sx={{ pr: "10px" }} />
                : <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ pr: "10px", color: "warning.main" }} >
                    {"This comment was deleted :("}
                </Typography>
            }
            {kids && (
                <Link onClick={handleShowReplies} sx={{ cursor: "pointer" }}>{!showReplies ? `Show ${kids.length} replie(s)` : "Hide replie(s)"}</Link>
            )}
            {showReplies &&
                kids.map((kidId) => (
                    //Recursively showing of comments
                    <Comment key={kidId} comment={comments.find((c) => c.id === kidId) as ApiItemModel} level={level + 1} />
                ))}
        </Box>
    );
};

export default Comment;
