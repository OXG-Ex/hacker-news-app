import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Badge, Tooltip } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useCallback, useMemo } from "react";
import { ApiItemModel } from "../../../../models/ApiItemModel";
import { routes } from "../../../router/routes";
import { useNavigate } from "react-router-dom";

export type PostItemProps = {
    post: ApiItemModel;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const navigate = useNavigate();
    const date = useMemo(() => new Date(post.time * 1000), [post.time]);

    const openPost = useCallback(() => navigate(routes.post.replace(":postId", post.id.toString())), [navigate, post.id]);

    return <Card elevation={8} sx={{ width: "100%", cursor: "pointer" }} onClick={openPost} >
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: "primary.main" }} >
                    {post.by[0]}
                </Avatar>
            }
            title={post.by}
            subheader={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
        />

        <CardContent>
            <Typography variant="h6">
                {post.title}
            </Typography>

            {post.text && <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: post.text }} />}
        </CardContent>

        <CardActions sx={{ flexDirection: "row-reverse", gap: "15px", paddingRight: "20px" }}>
            <Tooltip title="Score">
                <Badge badgeContent={post.score} color="secondary" showZero>
                    <StarRateIcon color="action" />
                </Badge>
            </Tooltip>
            <Tooltip title="Comments">
                <Badge badgeContent={post.descendants} color="secondary" showZero>
                    <CommentIcon color="action" />
                </Badge>
            </Tooltip>
        </CardActions>
    </Card>;
};

export default PostItem;
