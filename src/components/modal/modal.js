import React from "react";
import styles from "./modal.module.css";
import Backdrop from "../backdrop";

export default ({ isShow, clickHandler, children }) => {
	return (
		isShow && (
			<div className={styles.backdrop} onClick={clickHandler}>
				{children}
			</div>
		)
	);
};
