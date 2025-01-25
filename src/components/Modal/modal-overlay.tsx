import React, { FC, ReactNode } from 'react';
import styles from './modal.module.css';

interface ModalOverlayProps {
	children: ReactNode;
	onClose: () => void;
}
export const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose }) => {
	return (
		<div
			className={styles.modal_overlay}
			onClick={onClose}
			data-testid='modal-overlay'>
			{children}
		</div>
	);
};
