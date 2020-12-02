import React, { useCallback, useReducer } from "react";
import axios from "axios";
import { GithubProvider } from "./context";
import { GithubReducer, initialState } from "./reducer";
import { SEARCH_USERS, CLEAR_USERS, UPDATE_USERS, MERGE_USERS } from "./types";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

class QueryStringGithub {
	filter = {};

	constructor(filter) {
		this.filter = filter;
	}

	login(login) {
		return `${encodeURIComponent(login)} in:login`;
	}

	name(name) {
		return `${encodeURIComponent(name)} in:name`;
	}

	toString() {
		return Object.entries(this.filter)
			.reduce((acc, [name, value]) => {
				if (name in this) {
					acc.push(this[name](value));
				}

				return acc;
			}, [])
			.join(" AND ");
	}
}

export const GithubState = ({ children }) => {
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	const getUserInfoByLoginHandler = useCallback(async (value) => {
		const { data } = await axios.get(`https://api.github.com/users/${value}`, {
			params: {
				client_id,
				client_secret,
			},
		});

		dispatch({
			type: UPDATE_USERS,
			user: data,
		});
	}, []);

	const searchUserByLoginHandler = useCallback(
		async (filter, page, per_page) => {
			const { data } = await axios.get("https://api.github.com/search/users", {
				params: {
					q: `${new QueryStringGithub(filter)}`,
					client_id,
					client_secret,
					page,
					per_page,
				},
			});

			dispatch({
				type: SEARCH_USERS,
				users: data.items,
				total_count: data.total_count,
			});
		},
		[]
	);

	const clearUserHandler = useCallback(() => {
		dispatch({
			type: CLEAR_USERS,
		});
	}, []);

	const mergeUserInfoHandler = useCallback(() => {
		dispatch({
			type: MERGE_USERS,
		});
	}, []);

	const { users, total_count } = state;

	return (
		<GithubProvider
			value={{
				getUserInfoByLoginHandler,
				searchUserByLoginHandler,
				mergeUserInfoHandler,
				clearUserHandler,
				users,
				total_count,
			}}
		>
			{children}
		</GithubProvider>
	);
};
