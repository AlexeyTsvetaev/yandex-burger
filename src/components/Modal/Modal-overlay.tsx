import React, {FC, ReactNode} from "react";
import styles from './modal.module.css'

interface ModalOverlayProps {
	children : ReactNode
	onClose : () => void
}
export const ModalOverlay:FC<ModalOverlayProps> = ({children, onClose}) => {
	const handleOverlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();

	};
	return (
		<div className={styles.modal_overlay} onClick={onClose}>
			{children}
		</div>
	)
}