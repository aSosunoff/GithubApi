import React from "react";
import styles from "./backdrop.module.css";

export default ({ isShow, clickHandler, children }) => {
	return (
		isShow && (
			<div className={styles.backdrop} click={clickHandler}>
				{children}
			</div>
		)
	);
};
