import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ApiItemModel } from "../../models/ApiItemModel";
import { RootStoreType } from "../rootReducer";
import { initialNewsState } from "./newsDataModel";

const newsDataSlice = createSlice({
    name: 'newsData',
    initialState: initialNewsState,
    reducers: {
        setPosts: (state, action: PayloadAction<ApiItemModel[]>) => {
            action.payload.sort((a, b) => b.time - a.time);
            state.posts = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        pushComments: (state, action: PayloadAction<ApiItemModel[]>) => {
            state.comments = [...state.comments, ...action.payload];
        },
        cleanComments: (state) => {
            state.comments = [];
        },
    }
});

export const {
    setPosts,
    setIsLoading,
    pushComments,
    cleanComments
} = newsDataSlice.actions;

//selectors
export const getPosts = (store: RootStoreType): ApiItemModel[] => store.newsData.posts;
export const getIsLoading = (store: RootStoreType): boolean => store.newsData.isLoading;
export const getComments = (store: RootStoreType): ApiItemModel[] => store.newsData.comments;

export const getPostById = (postId: number) => createSelector(getPosts, (posts) => posts.find(x => x.id === postId));

export default newsDataSlice.reducer;
