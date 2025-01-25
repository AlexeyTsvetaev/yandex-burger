import React, { CSSProperties, FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
	onClose: () => void;
	title: string | undefined;
	children?: ReactNode;
	open: boolean;
	style?: CSSProperties;
}

export const Modal: FC<ModalProps> = ({
	onClose,
	open = true,
	title,
	children,
	style = {},
}) => {
	const modalRoot = document.getElementById('react-modals');

	useEffect(() => {
		const handleEscButton = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscButton);
		return () => {
			document.removeEventListener('keydown', handleEscButton);
		};
	}, [onClose]);

	// Проверка на существование данных

	return modalRoot
		? createPortal(
				open && (
					<ModalOverlay onClose={onClose}>
						<div onClick={(e) => e.stopPropagation()}>
							<div className={styles.modal_content} style={style}>
								<div className={styles.modal_header}>
									<p className='text text_type_main-large'>{title}</p>
									<div data-testid='modal-close-icon' onClick={onClose}>
										<CloseIcon type='primary' className={styles.close_icon} />
									</div>
								</div>
								{children}
							</div>
						</div>
					</ModalOverlay>
				),
				modalRoot
		  )
		: null; // Проверка на случай, если modalRoot не найден
};
