import React, { useCallback, useMemo /* , useState */ } from "react";
/* import ReactDOM from "react-dom"; */
/* import { v4 } from "uuid"; */
import "material-icons/iconfont/material-icons.css";
import Table from "@asosunoff/react-table";
import { withHOC } from "./HOC/withHOC";
import { GithubState } from "./context/Github/state";
import { useGithubContext } from "./context/Github/context";

/* utils */
/* const newRecord = (id, text, name) => ({
	id,
	text,
	name,
}); */
/*  */

const App = () => {
	const { search, users } = useGithubContext();

	const searchHandler = useCallback(search);

	/* TABLE */
	/* const [list, setList] = useState([
		newRecord(2, "aa", "bb"),
		newRecord(1, "a", "b"),
		newRecord(3, "aaa", "bbb"),
	]);

	const addRecord = useCallback(() => {
		const value = v4();
		setList((prev) => [
			...prev,
			newRecord(
				value,
				value,
				"test",
				new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate()
				).getTime()
			),
		]);
	}, []);

	const deleteRecord = useCallback(
		(record) =>
			setList((prev) => [...prev.filter(({ id }) => id !== record.id)]),
		[]
	); */
	/*  */

	/* const filterList = useMemo(
		() =>
			list.map(({ id, text }) => ({
				id,
				text,
			})),
		[list]
	); */

	const header = useMemo(
		() => ({
			login: {
				format: (value, record) => <a href={record.html_url}>{value}</a>,
			},
			/* id: {
				titleHead: "№",
				width: "170px",
				order: {
					type: "number",
					direction: "asc",
				},
				filter: {
					type: "list",
					items: filterList,
				},
				btns: [
					{
						title: "Посмотреть данные",
						handler: (record) => alert(record.id),
						icon: "remove_red_eye",
					},
				],
			}, */
			/* text: {
				titleHead: "Текст",
				order: {
					type: "string",
					direction: "desc",
				},
				filter: {
					type: "text",
					detail: {
						name: 12,
						qwe: "qwe",
					},
				},
				btns: [
					(record) =>
						record.id === 3 && {
							title: "Посмотреть данные",
							handler: (record) => alert(record.text),
							icon: "remove_red_eye",
						},
				],
			},
			name: {
				titleHead: "Наименование",
			}, */
		}),
		[
			/* filterList */
		]
	);

	return (
		<Table
			title="Таблица"
			list={users}
			header={header}
			pageSize={10}
			rowsBtn={[
				{
					title: "Просмотреть запись",
					handler: (record) => alert(JSON.stringify(record)),
					icon: "remove_red_eye",
				},
				/* {
					title: ({ id }) => `Удалить запись ${id}`,
					handler: deleteRecord,
					icon: "delete",
				}, */
			]}
			controlPanel={[
				/* {
					title: "Добавить запись",
					handler: addRecord,
				}, */
				{
					title: "Github",
					handler: () => searchHandler(),
				},
			]}
		/>
	);
};

export default withHOC(GithubState)(App);
