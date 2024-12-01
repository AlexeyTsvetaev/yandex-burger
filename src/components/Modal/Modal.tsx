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

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	useEffect(() => {
		const handleEscButton = (e: KeyboardEvent) => {
			e.key === 'Escape' ? onClose() : null;
		};
		document.addEventListener('keydown', handleEscButton);
		return () => {
			document.removeEventListener('keydown', handleEscButton);
		};
	}, []);
	return createPortal(
		open && (
			<ModalOverlay onClose={onClose}>
				<div onClick={handleModalClick}>
					<div className={styles.modal_content} style={{ ...style }}>
						<div className={styles.modal_header}>
							<p className='text text_type_main-large'>{title}</p>{' '}
							<CloseIcon
								type='primary'
								onClick={onClose}
								className={styles.close_icon}
							/>
						</div>
						{children}
					</div>
				</div>
			</ModalOverlay>
		),
		modalRoot!
	);
};
