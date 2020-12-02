import produce from "immer";
import { CLEAR_USERS, SEARCH_USERS, UPDATE_USERS, MERGE_USERS } from "./types";

export const initialState = {
	users: [],
	userFullInfo: [],
	total_count: 0,
};

const handlers = {
	[SEARCH_USERS]: (draft, { users, total_count }) => {
		draft.users = users.map((user) => ({
			...user,
			isLoadFullInfo: false,
		}));
		draft.total_count = total_count;
	},
	[UPDATE_USERS]: (draft, { user }) => {
		draft.userFullInfo.push(user);
	},
	[MERGE_USERS]: (draft) => {
		const getUserInfo = (login) =>
			draft.userFullInfo.find((user) => login === user.login);

		draft.users.forEach((user) => {
			user.isLoadFullInfo = true;
			user.name = getUserInfo(user.login)?.name;
		});

		draft.userFullInfo = [];
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
