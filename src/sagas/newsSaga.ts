import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { ApiItemModel } from "../models/ApiItemModel";
import { getPostById, setTopLevelComments, setIsLoading, setPosts, pushChildComments, getCachedItemsIds, setSelectedPost } from "../store/newsData/newsDataReducer";
import { loadTopLevelComments, loadPosts, loadChildComments, loadPostById } from "./newsSagaActions";
import { LoadChildCommentsActionType, LoadTopLevelCommentsActionType } from "./newsSagaActionTypes";

export const newsSagas = [
    takeLatest(loadPosts, watchLoadingNews),
    takeLatest(loadTopLevelComments, watchLoadingComments),
    takeLatest(loadChildComments, watchLoadingComments),
    takeLatest(loadPostById, watchLoadingPost),
];

const newsApiFetch = (): Promise<ApiItemModel[]> => fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then(res => res.json());
const itemsApiFetch = (itemId: number): Promise<ApiItemModel> => fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`).then(res => res.json());

function* watchLoadingNews(): Generator {
    try {
        yield put(setIsLoading(true));
        const cachedItems = (yield select(getCachedItemsIds)) as Set<number>;
        const response = (yield call(newsApiFetch)) as number[];

        //Take first 100 posts
        const topPosts = response.slice(0, 100);
        //Fetch each post from API or take it from store if it's already cached
        const posts = (yield all(topPosts.map((id: number) => cachedItems.has(id) ? select(getPostById(id)) : call(itemsApiFetch, id)))) as ApiItemModel[];

        yield put(setPosts(posts));
        yield put(setIsLoading(false));
    }
    catch (error) {
        //TODO: Error handling
    }
}

function* watchLoadingComments(action: PayloadAction<number>): Generator {
    try {
        //Get parent item from API or cache
        let item = (yield (select(getPostById(action.payload)))) as ApiItemModel;
        if (!item) {
            item = (yield call(itemsApiFetch, action.payload)) as ApiItemModel;
        }

        //Get ids of child's
        const commentIds = item.kids;
        //Fetch comments from API
        const comments = (yield all(commentIds.map((commentId) => call(itemsApiFetch, commentId)))) as ApiItemModel[];

        //Because comments are rendered recursively this saga can be used for loading top level comments and child
        // (parent item can be post or comment)  
        switch (action.type) {
            case LoadTopLevelCommentsActionType:
                yield put(setTopLevelComments(comments));
                break;
            case LoadChildCommentsActionType:
                yield put(pushChildComments(comments));
                break;
        }

    }
    catch (error) {
        //TODO: Error handling
    }
}

function* watchLoadingPost(action: PayloadAction<number>): Generator {
    try {
        yield put(setIsLoading(true));
        const item = (yield call(itemsApiFetch, action.payload)) as ApiItemModel;
        console.log(item);
        yield put(setSelectedPost(item));
        yield put(setIsLoading(false));
    }
    catch (error) {
        //TODO: Error handling
    }
}
