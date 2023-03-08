import { Stack } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { getPosts } from "../../../store/newsData/newsDataReducer";
import PostItem from "./PostItem/PostItem";

const PostsList = () => {
    const posts = useAppSelector(getPosts);
    const cards = posts.map(x => x && <PostItem post={x} key={x.id} />);
    return <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
    >
        {cards}
    </Stack>;
};

export default PostsList;
