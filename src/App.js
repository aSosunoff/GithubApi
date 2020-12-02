import React, { useCallback, useState } from "react";
/* import ReactDOM from "react-dom"; */
import "material-icons/iconfont/material-icons.css";
import Table from "@asosunoff/react-table";
import { withHOC } from "./HOC/withHOC";
import { GithubState } from "./context/Github/state";
import { useGithubContext } from "./context/Github/context";
/* import Loader from "./components/loader"; */
import Backdrop from "./components/backdrop";

const App = () => {
	const [filterState, setFilter] = useState({});

	const [pagination, setPagination] = useState({
		pageSize: 5,
		currentPage: 1,
	});

	const {
		searchUserHandler,
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
				searchUserHandler(filter, currentPage, pagination.pageSize);
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
			searchUserHandler,
			clearUserHandler,
			pagination.pageSize,
			setFilter,
			setPagination,
		]
	);

	const onPageHandler = useCallback(
		(currentPage) => {
			if (!Object.keys(filterState).length) {
				return;
			}

			searchUserHandler(filterState, currentPage, pagination.pageSize);
			setPagination((prev) => ({
				...prev,
				currentPage,
			}));
		},
		[filterState, pagination.pageSize, setPagination, searchUserHandler]
	);

	const [isShowModal, setShowModal] = useState(false);

	return (
		<>
			<Backdrop
				isShow={isShowModal}
				clickHandler={() => setShowModal(false)}
			></Backdrop>

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
						handler: () => setShowModal(true),
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
		</>
	);
};

export default withHOC(GithubState)(App);
