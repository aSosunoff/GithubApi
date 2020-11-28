import React from "react";

export const withHOC = (Provider, getProps = () => {}) => (
	WrapperComponent
) => {
	const WithHOC = (props) => (
		<Provider {...getProps(props)}>
			<WrapperComponent {...props} />
		</Provider>
	);

	return WithHOC;
};
