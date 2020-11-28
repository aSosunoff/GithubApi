import { SEARCH_USERS } from "./types";

const handlers = {
	[SEARCH_USERS]: (state, action) => ({
		...state,
		users: action.payload,
	}),
	DEFAULT: (state) => state,
};

export const GithubReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};
