import React from "react";
import cn from "classnames";
import styles from "./backdrop.module.scss";

const Backdrop = ({ isShow, clickHandler, children, className }) =>
	isShow && (
		<div className={cn(styles.backdrop, className)} onClick={clickHandler}>
			{children}
		</div>
	);

export default Backdrop;
