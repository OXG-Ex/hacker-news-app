import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NewsModel } from "../../models/NewsModel";
import { RootStoreType } from "../rootReducer";
import { initialNewsState } from "./newsDataModel";

const weeklyDataSlice = createSlice({
    name: 'newsData',
    initialState: initialNewsState,
    reducers: {
        setNews: (state, action: PayloadAction<NewsModel[]>) => {
            action.payload.sort((a, b) => b.time - a.time);
            state.news = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const {
    setNews,
    setIsLoading
} = weeklyDataSlice.actions;

//selectors
export const getNews = (store: RootStoreType): NewsModel[] => store.newsData.news;
export const getIsLoading = (store: RootStoreType): boolean => store.newsData.isLoading;

export default weeklyDataSlice.reducer;
