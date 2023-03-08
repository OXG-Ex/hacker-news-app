import { ApiItemModel } from "../../models/ApiItemModel";

export const initialNewsState = {
    posts: [] as ApiItemModel[],
    isLoading: false,
    comments: [] as ApiItemModel[],
};
