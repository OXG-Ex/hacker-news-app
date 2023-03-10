import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { getPosts } from "../../../store/newsData/newsDataReducer";
import { ViewportList } from "react-viewport-list";
import PostItem from "./PostItem/PostItem";
import { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const PostsList = () => {
    const posts = useAppSelector(getPosts);

    const ref = useRef<HTMLDivElement>(null);
    return <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        ref={ref}
    >
        {!!posts?.length && <Typography variant="h3" color="primary.main" sx={{ pt: "20px" }}>Last {posts?.length} posts:</Typography>}
        {/* Custom designed scrollbar */}
        <Scrollbars style={{ height: "calc(100vh - 92px)" }} color="green" renderThumbVertical={() => <Box sx={{ backgroundColor: "primary.main", borderRadius: 5 }} />}>
            {/* Optimize rendering with  Viewport List*/}
            <ViewportList viewportRef={ref} items={posts} itemMargin={100}>
                {(x) => (
                    <PostItem post={x} key={x.id} isPostsPage={false} />
                )}
            </ViewportList>
        </Scrollbars>
    </Stack>;
};

export default PostsList;
