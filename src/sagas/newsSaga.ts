import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { ApiItemModel } from "../models/ApiItemModel";
import { getPostById, pushComments, setIsLoading, setPosts } from "../store/newsData/newsDataReducer";
import { loadComments, loadNews } from "./newsSagaActions";

export const newsSagas = [
    takeLatest(loadNews, watchLoadingNews),
    takeLatest(loadComments, watchLoadingComments),
];

const newsApiFetch = (): Promise<ApiItemModel[]> => fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then(res => res.json());
const itemsApiFetch = (itemId: number): Promise<ApiItemModel> => fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`).then(res => res.json());

function* watchLoadingNews(): Generator {
    try {
        yield put(setIsLoading(true));
        const response = (yield call(newsApiFetch)) as number[];

        const topPosts = response.slice(0, 100);
        const posts = (yield all(topPosts.map((id: number) => call(itemsApiFetch, id)))) as ApiItemModel[];

        yield put(setPosts(posts));
        yield put(setIsLoading(false));
    }
    catch (error) {
        //TODO: Error handling
    }
}

function* watchLoadingComments(action: PayloadAction<number>): Generator {
    try {
        const item = (yield select(getPostById(action.payload))) as ApiItemModel || itemsApiFetch(action.payload);
        const commentIds = item.kids;
        const comments = (yield all(commentIds.map((commentId) => call(itemsApiFetch, commentId)))) as ApiItemModel[];

        yield put(pushComments(comments));
    }
    catch (error) {
        //TODO: Error handling
    }
}
