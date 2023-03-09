import { ApiItemModel } from "../../models/ApiItemModel";

export const initialNewsState = {
    posts: [] as ApiItemModel[],
    isLoading: false,
    topLevelComments: [] as ApiItemModel[],
    childComments: [] as ApiItemModel[],
    cachedItemsIds: new Set<number>(),
    selectedPost: null as unknown as ApiItemModel
};
