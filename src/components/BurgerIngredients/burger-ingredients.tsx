import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { IIngredients, Ingredient } from './Ingredient';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const BurgerIngredients: FC = () => {
	const [current, setCurrent] = useState('one');
	const containerRef = useRef<HTMLDivElement>(null);
	const bunsRef = useRef<HTMLDivElement>(null);
	const saucesRef = useRef<HTMLDivElement>(null);
	const mainsRef = useRef<HTMLDivElement>(null);
	const data = useSelector((state: RootState) => state.ingredients.ingredients);

	const buns = data.filter((item : IIngredients) => item.type === 'bun');
	const sauces = data.filter((item : IIngredients) => item.type === 'sauce');
	const mains = data.filter((item : IIngredients) => item.type === 'main');

	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleScroll = () => {
		const container = containerRef.current;
		const bunsPos = bunsRef.current?.getBoundingClientRect().top || 0;
		const saucesPos = saucesRef.current?.getBoundingClientRect().top || 0;
		const mainsPos = mainsRef.current?.getBoundingClientRect().top || 0;

		const containerTop = container?.getBoundingClientRect().top || 0;

		const distances = [
			{ section: 'one', distance: Math.abs(containerTop - bunsPos) },
			{ section: 'two', distance: Math.abs(containerTop - saucesPos) },
			{ section: 'three', distance: Math.abs(containerTop - mainsPos) }
		];

		const closestSection = distances.reduce((prev, curr) =>
			prev.distance < curr.distance ? prev : curr
		);

		setCurrent(closestSection.section);
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);


	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p className="text text_type_main-large">Соберите бургер</p>
			</div>
			<div className={styles.tabs_block}>
				<Tab
					value="one"
					active={current === 'one'}
					onClick={() => {
						setCurrent('one');
						scrollToSection(bunsRef);
					}}>
					Булки
				</Tab>
				<Tab
					value="two"
					active={current === 'two'}
					onClick={() => {
						setCurrent('two');
						scrollToSection(saucesRef);
					}}>
					Соусы
				</Tab>
				<Tab
					value="three"
					active={current === 'three'}
					onClick={() => {
						setCurrent('three');
						scrollToSection(mainsRef);
					}}>
					Начинки
				</Tab>
			</div>

			<div className={styles.ingredients_container} ref={containerRef}>
				<div className={styles.container_body}>
					<p ref={bunsRef} className="text text_type_main-medium">
						Булки
					</p>
					<div className={styles.bread_container}>
						{buns.map((item) => (
							<Ingredient
								key={uuidv4()}
								name={item.name}
								price={item.price}
								image={item.image}
								calories={item.calories}
								fat={item.fat}
								carbohydrates={item.carbohydrates}
								proteins={item.proteins}
								_id={item._id}
								type={item.type}
							/>
						))}
					</div>

					<p ref={saucesRef} className="text text_type_main-medium">
						Соусы
					</p>
					<div className={styles.bread_container}>
						{sauces.map((item) => (
							<Ingredient
								key={uuidv4()}
								name={item.name}
								price={item.price}
								image={item.image}
								calories={item.calories}
								fat={item.fat}
								carbohydrates={item.carbohydrates}
								proteins={item.proteins}
								_id={item._id}
								type={item.type}
							/>
						))}
					</div>

					<p ref={mainsRef} className="text text_type_main-medium">
						Начинки
					</p>
					<div className={styles.bread_container}>
						{mains.map((item) => (
							<Ingredient
								key={uuidv4()}
								name={item.name}
								price={item.price}
								image={item.image}
								calories={item.calories}
								fat={item.fat}
								carbohydrates={item.carbohydrates}
								proteins={item.proteins}
								_id={item._id}
								type={item.type}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
