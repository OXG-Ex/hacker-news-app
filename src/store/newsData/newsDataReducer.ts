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
        setTopLevelComments: (state, action: PayloadAction<ApiItemModel[]>) => {
            state.topLevelComments = action.payload;
        },
        pushChildComments: (state, action: PayloadAction<ApiItemModel[]>) => {
            state.chilComments = [...state.chilComments, ...action.payload];
        },
        cleanComments: (state) => {
            state.chilComments = [];
        },
    }
});

export const {
    setPosts,
    setIsLoading,
    setTopLevelComments,
    pushChildComments,
    cleanComments
} = newsDataSlice.actions;

//selectors
export const getPosts = (store: RootStoreType): ApiItemModel[] => store.newsData.posts;
export const getIsLoading = (store: RootStoreType): boolean => store.newsData.isLoading;
export const getTopLevelComments = (store: RootStoreType): ApiItemModel[] => store.newsData.topLevelComments;
export const getChildComments = (store: RootStoreType): ApiItemModel[] => store.newsData.chilComments;

export const getPostById = (postId: number) => createSelector(getPosts, (posts) => posts.find(x => x.id === postId));

export default newsDataSlice.reducer;
