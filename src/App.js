import React, { useCallback, useEffect, useState } from "react";
/* import ReactDOM from "react-dom"; */
import "material-icons/iconfont/material-icons.css";
import Table from "@asosunoff/react-table";
import { withHOC } from "./HOC/withHOC";
import { GithubState } from "./context/Github/state";
import { useGithubContext } from "./context/Github/context";
import Loader from "./components/loader";

const App = () => {
	const [filterState, setFilter] = useState({});

	const [pagination, setPagination] = useState({
		pageSize: 5,
		currentPage: 1,
	});

	const {
		getUserInfoByLoginHandler,
		searchUserByLoginHandler,
		mergeUserInfoHandler,
		clearUserHandler,
		users,
		total_count,
	} = useGithubContext();

	const onFilterHandler = useCallback(
		(filters) => {
			const filter = Object.fromEntries(
				Object.entries(filters).map(([nameField, { value }]) => [
					nameField,
					value,
				])
			);

			const currentPage = 1;
			if (Object.keys(filter).length) {
				searchUserByLoginHandler(filter, currentPage, pagination.pageSize);
				setFilter(filter);
			} else {
				clearUserHandler();
				setFilter("");
			}

			setPagination((prev) => ({
				...prev,
				currentPage,
			}));
		},
		[
			searchUserByLoginHandler,
			clearUserHandler,
			pagination.pageSize,
			setFilter,
			setPagination,
		]
	);

	const onPageHandler = useCallback(
		(currentPage) => {
			if (!Object.keys(filter).length) {
				return;
			}

			searchUserByLoginHandler(filterState, currentPage, pagination.pageSize);
			setPagination((prev) => ({
				...prev,
				currentPage,
			}));
		},
		[filterState, pagination.pageSize, setPagination, searchUserByLoginHandler]
	);

	useEffect(() => {
		(async () => {
			if (!users.length) {
				return;
			}
			for (const user of users) {
				await getUserInfoByLoginHandler(user.login);
			}
			mergeUserInfoHandler();
		})();
	}, [getUserInfoByLoginHandler, users, mergeUserInfoHandler]);

	return (
		<Table
			title="Таблица"
			recordStyles={{
				height: "71px",
			}}
			list={users}
			header={{
				avatar_url: {
					width: "100px",
					titleHead: "Аватар",
					format: (value, record) =>
						value && (
							<img
								alt={record.login}
								style={{
									maxWidth: "70px",
								}}
								src={value}
							/>
						),
				},
				login: {
					titleHead: "Логин",
					filter: {
						type: "text",
					},
				},
				name: {
					titleHead: "Имя",
					filter: {
						type: "text",
					},
					format: (value, record) => {
						if (!users.length) {
							return;
						}
						return record.isLoadFullInfo ? value : <Loader />;
					},
				},
			}}
			pageSize={pagination.pageSize}
			rowsBtn={[
				{
					title: "Перейти на Github",
					handler: (record) => {
						const otherWindow = window.open();
						otherWindow.opener = null;
						otherWindow.location = record.html_url;
					},
					icon: "link",
				},
				{
					title: "Просмотреть запись",
					handler: (record) => alert(JSON.stringify(record, null, 4)),
					icon: "remove_red_eye",
				},
			]}
			custom
			onFilterHandler={onFilterHandler}
			onOrderHandler={() => {}}
			onPageHandler={onPageHandler}
			pageCount={Math.ceil(total_count / pagination.pageSize) || 1}
			currentPage={pagination.currentPage}
		/>
	);
};

export default withHOC(GithubState)(App);
