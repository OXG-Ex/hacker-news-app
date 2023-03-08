import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Badge, Tooltip } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useMemo } from "react";
import { NewsModel } from "../../../../models/NewsModel";

export type NewsItemProps = {
    news: NewsModel;
};

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    const date = useMemo(() => new Date(news.time * 1000), [news.time]);
    return <Card elevation={8} sx={{ width: "100%" }}>
        <CardHeader
            avatar={
                <Avatar >
                    {news.by[0]}
                </Avatar>
            }
            title={news.by}
            subheader={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
        />
        <CardContent>
            <Typography variant="h6">
                {news.title}
            </Typography>
            {news.text && <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: news.text }} />}
        </CardContent>
        <CardActions sx={{ flexDirection: "row-reverse", gap: "15px", paddingRight: "20px" }}>
            <Tooltip title="Score">
                <Badge badgeContent={news.score} color="secondary" showZero>
                    <ThumbUpIcon color="action" />
                </Badge>
            </Tooltip>
            <Tooltip title="Comments">
                <Badge badgeContent={news.descendants} color="secondary" showZero>
                    <CommentIcon color="action" />
                </Badge>
            </Tooltip>
        </CardActions>
    </Card>;
};

export default NewsItem;
