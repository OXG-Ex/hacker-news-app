import { createAction } from "@reduxjs/toolkit";

export const loadNews = createAction('LOAD_TOP_NEWS');
export const loadComments = createAction<number>('LOAD_COMMENTS');
