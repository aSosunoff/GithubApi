import React, { createContext, useContext } from "react";

const GithubContext = createContext();

GithubContext.displayName = "GithubContext";

export const useGithubContext = () => useContext(GithubContext);

export const GithubProvider = ({ children, value }) => {
	return (
		<GithubContext.Provider value={value}>{children}</GithubContext.Provider>
	);
};
