import { NewsModel } from "../../models/NewsModel";

export const initialNewsState = {
    news: [] as NewsModel[],
    isLoading: true
};
