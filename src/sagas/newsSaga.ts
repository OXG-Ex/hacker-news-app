import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { ApiItemModel } from "../models/ApiItemModel";
import { getPostById, setTopLevelComments, setIsLoading, setPosts, pushChildComments } from "../store/newsData/newsDataReducer";
import { loadTopLevelComments, loadPosts, loadChildComments } from "./newsSagaActions";
import { LoadChildCommentsActionType, LoadTopLevelCommentsActionType } from "./newsSagaActionTypes";

export const newsSagas = [
    takeLatest(loadPosts, watchLoadingNews),
    takeLatest(loadTopLevelComments, watchLoadingComments),
    takeLatest(loadChildComments, watchLoadingComments),
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
        let item = (yield (select(getPostById(action.payload)))) as ApiItemModel;
        if (!item) {
            item = (yield call(itemsApiFetch, action.payload)) as ApiItemModel;
        }

        const commentIds = item.kids;
        const comments = (yield all(commentIds.map((commentId) => call(itemsApiFetch, commentId)))) as ApiItemModel[];

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
