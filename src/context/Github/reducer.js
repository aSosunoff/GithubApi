import produce from "immer";
import { CLEAR_USERS, SEARCH_USERS, GET_USER } from "./types";

export const initialState = {
	users: [],
	user: {},
	userFullInfo: [],
	total_count: 0,
};

const handlers = {
	[SEARCH_USERS]: (draft, { users, total_count }) => {
		draft.users = users;
		draft.total_count = total_count;
	},
	[GET_USER]: (draft, { user }) => {
		draft.user = user;
	},
	[CLEAR_USERS]: () => {
		return initialState;
	},
	DEFAULT: (state) => state,
};

export const GithubReducer = produce((draft = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(draft, action);
});
