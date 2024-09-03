import React, {CSSProperties, FC, ReactNode, useState} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {ModalOverlay} from "./ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


interface ModalProps {
	onClose: ()=> void;
	title : string
	children? : ReactNode
	open: boolean
	style? : CSSProperties
}

export const Modal:FC<ModalProps> = ({onClose, open = false, title, children, style = {} }) => {
	const modalRoot = document.getElementById('react-modals')

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return createPortal(
		( open ? (
			<>
				<ModalOverlay onClose={onClose}>
					<div onClick={handleModalClick}>
						<div className={styles.modal_content} style={{...style}}>
							<div className={styles.modal_header}>
								<p className="text text_type_main-large">
									{title}
								</p> <CloseIcon type="primary" onClick={onClose} className={styles.close_icon}/>
							</div>
							{children}
						</div>
					</div>
				</ModalOverlay>


			</>
			) : <></>
		),
		modalRoot!
	);
}