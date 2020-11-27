import React, { useCallback, useMemo, useState } from "react";
/* import ReactDOM from "react-dom"; */
import { v4 } from "uuid";
import "material-icons/iconfont/material-icons.css";
import Table from "@asosunoff/react-table";

/* utils */
const newRecord = (id, text, name) => ({
	id,
	text,
	name,
});
/*  */

const App = () => {
	/* TABLE */
	const [list, setList] = useState([
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
	);
	/*  */

	const filterList = useMemo(
		() =>
			list.map(({ id, text }) => ({
				id,
				text,
			})),
		[list]
	);

	const header = useMemo(
		() => ({
			id: {
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
			},
			text: {
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
			},
		}),
		[filterList]
	);

	return (
		<Table
			title="Таблица"
			list={list}
			header={header}
			pageSize={10}
			rowsBtn={[
				{
					title: "Просмотреть запись",
					handler: (record) => alert(JSON.stringify(record)),
					icon: "remove_red_eye",
				},
				{
					title: ({ id }) => `Удалить запись ${id}`,
					handler: deleteRecord,
					icon: "delete",
				},
			]}
			controlPanel={[
				{
					title: "Добавить запись",
					handler: addRecord,
				},
			]}
		/>
	);
};

export default App;
