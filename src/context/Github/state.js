import React, { useReducer } from "react";
import axios from "axios";
import { GithubProvider } from "./context";
import { GithubReducer } from "./reducer";
import { SEARCH_USERS } from "./types";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const GithubState = ({ children }) => {
	const initialState = {
		users: [],
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	const search = async (value) => {
		const { data } = await axios.get("https://api.github.com/search/users", {
			params: {
				q: 'aSosunoff',
				client_id,
				client_secret,
			},
		});

		dispatch({
			type: SEARCH_USERS,
			payload: data.items,
		});
	};

	const { users } = state;

	return (
		<GithubProvider
			value={{
				search,
				users,
			}}
		>
			{children}
		</GithubProvider>
	);
};
