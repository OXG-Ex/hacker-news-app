import { ApiItemModel } from "../../models/ApiItemModel";

export const initialNewsState = {
    posts: [] as ApiItemModel[],
    isLoading: false,
    topLevelComments: [] as ApiItemModel[],
    chilComments: [] as ApiItemModel[],
};
