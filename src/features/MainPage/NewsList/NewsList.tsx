import { Stack } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { getNews } from "../../../store/newsData/newsDataReducer";
import NewsItem from "./NewsItem/NewsItem";

const NewsList = () => {
    const news = useAppSelector(getNews);
    const cards = news.map(x => x && <NewsItem news={x} key={x.id} />);
    return <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
    >
        {cards}
    </Stack>;
};

export default NewsList;
