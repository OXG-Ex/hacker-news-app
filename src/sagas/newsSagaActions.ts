import { createAction } from "@reduxjs/toolkit";
import { LoadChildCommentsActionType, LoadPostsActionType, LoadTopLevelCommentsActionType } from "./newsSagaActionTypes";

export const loadPosts = createAction(LoadPostsActionType);
export const loadTopLevelComments = createAction<number>(LoadTopLevelCommentsActionType);
export const loadChildComments = createAction<number>(LoadChildCommentsActionType);
