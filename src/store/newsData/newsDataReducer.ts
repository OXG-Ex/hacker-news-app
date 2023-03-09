import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ApiItemModel } from "../../models/ApiItemModel";
import { RootStoreType } from "../rootReducer";
import { initialNewsState } from "./newsDataModel";

const newsDataSlice = createSlice({
    name: 'newsData',
    initialState: initialNewsState,
    reducers: {
        setPosts: (state, action: PayloadAction<ApiItemModel[]>) => {
            deleteCachedItems(action.payload);
            pushCachedItems(action.payload);
            action.payload.sort((a, b) => b.time - a.time);
            state.posts = action.payload;
        },
        pushPost: (state, action: PayloadAction<ApiItemModel>) => {
            pushCachedItemId(action.payload.id);
            state.posts = [...state.posts, action.payload];
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setTopLevelComments: (state, action: PayloadAction<ApiItemModel[]>) => {
            state.topLevelComments = action.payload;
        },
        pushChildComments: (state, action: PayloadAction<ApiItemModel[]>) => {
            state.childComments = [...state.childComments, ...action.payload];
        },
        cleanComments: (state) => {
            state.childComments = [];
        },
        pushCachedItemId: (state, action: PayloadAction<number>) => {
            state.cachedItemsIds.add(action.payload);
        },
        pushCachedItems: (state, action: PayloadAction<ApiItemModel[]>) => {
            action.payload.forEach(x => state.cachedItemsIds.add(x.id));
        },
        deleteCachedItems: (state, action: PayloadAction<ApiItemModel[]>) => {
            action.payload.forEach(x => state.cachedItemsIds.delete(x.id));
        },
        setSelectedPost: (state, action: PayloadAction<ApiItemModel>) => {
            state.selectedPost = action.payload;
        },
        clearSelectedPost: (state) => {
            state.selectedPost = null as unknown as ApiItemModel;
        },
    }
});

export const {
    setPosts,
    setIsLoading,
    setTopLevelComments,
    pushPost,
    pushChildComments,
    cleanComments,
    pushCachedItemId,
    pushCachedItems,
    deleteCachedItems,
    setSelectedPost,
    clearSelectedPost
} = newsDataSlice.actions;

//selectors
export const getPosts = (store: RootStoreType): ApiItemModel[] => store.newsData.posts;
export const getIsLoading = (store: RootStoreType): boolean => store.newsData.isLoading;
export const getTopLevelComments = (store: RootStoreType): ApiItemModel[] => store.newsData.topLevelComments;
export const getChildComments = (store: RootStoreType): ApiItemModel[] => store.newsData.childComments;
export const getCachedItemsIds = (store: RootStoreType): Set<number> => store.newsData.cachedItemsIds;
export const getSelectedPost = (store: RootStoreType): ApiItemModel => store.newsData.selectedPost;

export const getPostById = (postId: number) => createSelector(getPosts, (posts) => posts.find(x => x.id === postId));

export default newsDataSlice.reducer;
