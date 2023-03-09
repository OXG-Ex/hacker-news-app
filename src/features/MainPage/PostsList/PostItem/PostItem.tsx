import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Badge, Tooltip, Link } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useCallback, useMemo } from "react";
import { ApiItemModel } from "../../../../models/ApiItemModel";
import { routes } from "../../../router/routes";
import { useNavigate } from "react-router-dom";
import { sanitize } from "dompurify";

export type PostItemProps = {
    post: ApiItemModel;
    isPostsPage: boolean;
};

const PostItem: React.FC<PostItemProps> = ({ post, isPostsPage }) => {
    const navigate = useNavigate();
    const date = useMemo(() => new Date(post.time * 1000), [post.time]);

    const openPost = useCallback(() => navigate(routes.post.replace(":postId", post.id.toString())), [navigate, post.id]);

    return <Card elevation={8} sx={{ width: "100%" }} >
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
            {/* Don't show link to posts page if  user is on posts page*/}
            {isPostsPage
                ? <Typography variant="h6">
                    {post.title}
                </Typography>
                : <Link underline="hover" variant="h6" onClick={openPost} sx={{ cursor: "pointer" }}>
                    {post.title}
                </Link>}


            {post.text && <Typography
                variant="body2"
                color="text.secondary"
                //Use dompurify to clean post text from dangerous HTML (XSS attacks and so on)
                dangerouslySetInnerHTML={{ __html: sanitize(post.text) }}
            />}
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

            {isPostsPage
                && <Link underline="hover" sx={{ cursor: "pointer" }} rel="noreferrer" target="_blank" href={post.url + "222"}>
                    Open original post
                </Link>}

        </CardActions>
    </Card>;
};

export default PostItem;
