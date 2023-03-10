import { CombinedState, combineReducers, Reducer } from "redux";
import { initialNewsState } from "./newsData/newsDataModel";
import newsDataReducer from "./newsData/newsDataReducer";

export const initialState = {
    newsData: initialNewsState,
};

export type RootStoreType = typeof initialState;

export const createRootReducer = (): Reducer<CombinedState<RootStoreType>> => combineReducers<RootStoreType>({
    newsData: newsDataReducer
});
