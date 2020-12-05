import React, { useCallback, useReducer } from "react";
import axios from "axios";
import { GithubProvider } from "./context";
import { GithubReducer, initialState } from "./reducer";
import {
	SEARCH_USERS,
	CLEAR_USERS,
	LOAD_USER_INFO,
	SET_LOGIN_USER,
	SET_USERS_KEY,
} from "./types";
import { QueryStringGithub } from "../../utils/QueryStringGithub";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const GithubState = ({ children }) => {
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	const getUserInfoByLoginHandler = useCallback(
		async (login) => {
			if (
				!(
					login in state.cacheUser &&
					state.cacheUser[login].dateExpires > Date.now()
				)
			) {
				const { data } = await axios.get(
					`https://api.github.com/users/${login}`,
					{
						params: {
							client_id,
							client_secret,
						},
					}
				);

				dispatch({
					type: LOAD_USER_INFO,
					user: data,
				});
			}

			dispatch({
				type: SET_LOGIN_USER,
				login,
			});
		},
		[state.cacheUser]
	);

	const searchUserHandler = useCallback(
		async (filter, page, per_page) => {
			const usersKey = `${page}_${per_page}_${new QueryStringGithub(filter)}`;

			if (
				!(
					usersKey in state.cacheUsers &&
					state.cacheUsers[usersKey].dateExpires > Date.now()
				)
			) {
				const { data } = await axios.get(
					"https://api.github.com/search/users",
					{
						params: {
							q: `${new QueryStringGithub(filter)}`,
							client_id,
							client_secret,
							page,
							per_page,
						},
					}
				);

				dispatch({
					type: SEARCH_USERS,
					usersKey,
					users: data.items,
					total_count: data.total_count,
				});
			}

			dispatch({
				type: SET_USERS_KEY,
				usersKey,
			});
		},
		[state.cacheUsers]
	);

	const clearUserHandler = useCallback(() => {
		dispatch({
			type: CLEAR_USERS,
		});
	}, []);

	const { usersKey, cacheUsers, cacheUser, login } = state;

	return (
		<GithubProvider
			value={{
				getUserInfoByLoginHandler,
				searchUserHandler,
				clearUserHandler,
				users: cacheUsers[usersKey]?.users || [],
				total_count: cacheUsers[usersKey]?.total_count || 0,
				user: cacheUser[login]?.user || {},
			}}
		>
			{children}
		</GithubProvider>
	);
};
