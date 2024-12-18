import React, { CSSProperties, FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { OrderDetails } from '../IngredientDetails/ingredient-details';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // Типизация для состояния Redux

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
	const { id } = useParams();

	// Получаем ингредиенты через useSelector
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);
	const data = ingredients.find((e) => e._id === id);

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
	if (!data) {
		return null; // Модальное окно не рендерится, если данных нет
	}

	return modalRoot
		? createPortal(
				open && (
					<ModalOverlay onClose={onClose}>
						<div onClick={(e) => e.stopPropagation()}>
							<div className={styles.modal_content} style={style}>
								<div className={styles.modal_header}>
									<p className='text text_type_main-large'>{title}</p>
									<CloseIcon
										type='primary'
										onClick={onClose}
										className={styles.close_icon}
									/>
								</div>
								<OrderDetails
									name={data.name}
									image={data.image}
									calories={data.calories}
									fat={data.fat}
									carbohydrates={data.carbohydrates}
									proteins={data.proteins}
									price={data.price}
									_id={data._id}
									type={data.type}
								/>
								{children}
							</div>
						</div>
					</ModalOverlay>
				),
				modalRoot
		  )
		: null; // Проверка на случай, если modalRoot не найден
};
