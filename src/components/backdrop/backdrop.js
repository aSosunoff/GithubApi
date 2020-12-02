import React from "react";
import styles from "./backdrop.module.scss";

const Backdrop = ({ isShow, clickHandler, children }) => {
	return (
		isShow && (
			<div className={styles.backdrop} onClick={clickHandler}>
				{children}
			</div>
		)
	);
};

export default Backdrop;
