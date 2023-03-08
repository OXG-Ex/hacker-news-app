import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsModel } from "../../models/NewsModel";

import { RootStoreType } from "../rootReducer";
import { initialNewsState } from "./newsDataModel";

const weeklyDataSlice = createSlice({
    name: 'newsData',
    initialState: initialNewsState,
    reducers: {
        setNews: (state, action: PayloadAction<NewsModel[]>) => {
            state.news = action.payload;
        }
    }
});

export const {
    setNews
} = weeklyDataSlice.actions;

//selectors
export const getNews = (store: RootStoreType): NewsModel[] => store.newsData.news;

export default weeklyDataSlice.reducer;
