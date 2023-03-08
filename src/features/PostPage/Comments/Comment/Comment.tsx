import { ExpandMore } from '@mui/icons-material';
import { Avatar, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { ApiItemModel } from '../../../../models/ApiItemModel';
import { useAppSelector } from '../../../../store/hooks';
import { getComments } from '../../../../store/newsData/newsDataReducer';

export type CommentProps = {
    comment: ApiItemModel;
    level: number;
};

const Comment: React.FC<CommentProps> = ({ comment, level }) => {
    const [showReplies, setShowReplies] = useState(false);
    const { by, text, kids } = comment;
    const comments = useAppSelector(getComments);

    const handleShowReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div style={{ marginLeft: `${10 * level}px` }}>
            <Avatar>{by[0]}</Avatar>
            <Typography>{by}</Typography>
            <Typography>{text}</Typography>
            {kids && (
                <IconButton onClick={handleShowReplies}>
                    <ExpandMore />
                </IconButton>
            )}
            {showReplies &&
                kids.map((kidId) => (
                    <Comment key={kidId} comment={comments.find((c) => c.id === kidId) as ApiItemModel} level={level + 1} />
                ))}
        </div>
    );
};

export default Comment;
