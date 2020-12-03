import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import styles from "./modal.module.scss";
import Backdrop from "../backdrop";

const getUnicIdModal = () => `_${Math.random().toString(36).substr(2, 9)}`;

function Title() {
	return null;
}

function Body() {
	return null;
}

function Footer() {
	return null;
}

Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

function Modal({ isShow, onHideModal, children, style }) {
	const uniqID = useMemo(() => getUnicIdModal(), []);

	const onClick = useCallback(
		({ target }) =>
			document.contains(target) &&
			!target.closest(`.${styles["modal-back__item"]}.${uniqID}`) &&
			onHideModal(),
		[onHideModal, uniqID]
	);

	const title = Array.isArray(children)
		? children.find((child) => child.type === Title)
		: children.type === Title
		? children
		: null;

	const body = Array.isArray(children)
		? children.find((child) => child.type === Body)
		: children.type === Body
		? children
		: null;

	const footer = Array.isArray(children)
		? children.find((child) => child.type === Footer)
		: children.type === Footer
		? children
		: null;

	return (
		<Backdrop
			className={styles["modal-back"]}
			isShow={isShow}
			clickHandler={onClick}
		>
			<div className={cn(styles["modal-back__item"], uniqID)} style={style}>
				{title && (
					<div
						className={cn(styles["modal-back__title"], title.props.className)}
						style={title.props.style}
					>
						{title.props.children}
					</div>
				)}

				{body && (
					<div
						className={cn(styles["modal-back__body"], body.props.className)}
						style={body.props.style}
					>
						{body.props.children}
					</div>
				)}

				{footer && (
					<div
						className={cn(styles["modal-back__footer"], footer.props.className)}
						style={footer.props.style}
					>
						{footer.props.children}
					</div>
				)}
			</div>
		</Backdrop>
	);
}

export default Modal;
