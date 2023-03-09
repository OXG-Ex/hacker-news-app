import { createAction } from "@reduxjs/toolkit";
import * as ActionTypes from "./newsSagaActionTypes";

export const loadPosts = createAction(ActionTypes.LoadPostsActionType);
export const loadTopLevelComments = createAction<number>(ActionTypes.LoadTopLevelCommentsActionType);
export const loadChildComments = createAction<number>(ActionTypes.LoadChildCommentsActionType);
export const loadPostById = createAction<number>(ActionTypes.LoadPostByIdActionType);
