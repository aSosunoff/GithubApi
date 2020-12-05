import produce from "immer";
import {
	CLEAR_USERS,
	SEARCH_USERS,
	LOAD_USER_INFO,
	SET_LOGIN_USER,
	SET_USERS_KEY,
} from "./types";

export const initialState = {
	cacheUsers: {},
	usersKey: "",
	cacheUser: {},
	login: "",
};

const handlers = {
	[SEARCH_USERS]: (draft, { usersKey, users, total_count }) => {
		draft.cacheUsers[usersKey] = {
			users,
			total_count,
			dateExpires: Date.now() + 5 * 60 * 1000,
		};
	},
	[SET_USERS_KEY]: (draft, { usersKey }) => {
		draft.usersKey = usersKey;
	},
	[LOAD_USER_INFO]: (draft, { user }) => {
		draft.cacheUser[user.login] = {
			user,
			dateExpires: Date.now() + 5 * 60 * 1000,
		};
	},
	[SET_LOGIN_USER]: (draft, { login }) => {
		draft.login = login;
	},
	[CLEAR_USERS]: () => initialState,
	DEFAULT: (state) => state,
};

export const GithubReducer = produce((draft = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(draft, action);
});
