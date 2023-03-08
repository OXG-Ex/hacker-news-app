import { all, call, put, takeLatest } from "redux-saga/effects";
import { NewsModel } from "../models/NewsModel";
import { setNews } from "../store/newsData/newsDataReducer";

import { loadNews } from "./newsSagaActions";

export const newsSagas = [
    takeLatest(loadNews, watchLoadingNews),
];

const newsApiFetch = () => fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then(res => res.json());

function* watchLoadingNews(): Generator {
    try {
        const response = (yield call(newsApiFetch)) as number[];


        const promises = response.slice(0, 100).map(async (id: number) => {
            const newsResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return newsResponse.json();
        });

        const news = (yield all(promises)) as NewsModel[];
        yield put(setNews(news));
    }
    catch (error) {
    }
}
