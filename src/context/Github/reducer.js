import produce from "immer";
import { CLEAR_USERS, SEARCH_USERS, LOAD_USER_INFO } from "./types";

export const initialState = {
	users: [],
	catch: {},
	user: {},
	userFullInfo: [],
	total_count: 0,
};

const handlers = {
	[SEARCH_USERS]: (draft, { users, total_count }) => {
		draft.users = users;
		draft.total_count = total_count;
	},
	[LOAD_USER_INFO]: (draft, { user }) => {
		draft.catch[user.login] = {
			user,
			dateExpires: Date.now() + 5 * 60 * 1000,
		};
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
