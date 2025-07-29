import React from 'react'
import styles from './Card.module.scss'
// console.log(styles)

function Card({ onFavorite, onPlus }) {
	function onClickBtn() {
		console.log('btn was click')
	}

	const [isAded, setIsAded] = React.useState(false)

	const onClickPlus = () => {
		onPlus({title, price, imageUrl})
		setIsAded(!isAded)
	}

	React.useEffect(() => {
		isAded
			? console.log(`товар: ${title} було додано до корзини `)
			: console.log(`товар: ${title} було видалено з корзини `)
	}, [isAded])
	return (
		// 'card flex flex-col gap-y-4 relative'
		<div className={styles.card}>
			<div className='absolute cursor-pointer' onClick={onFavorite}>
				<img src='./img/heart-unlike.svg' alt='unlike' className='size-8 ' />
			</div>
			<div className='text-center'>
				<img className='size-28 mb-3 ' src={imageUrl} alt='sneakers' />
			</div>

			<h5 className='card__text text-sm font-normal min-h-16'>{title}</h5>
			<div className='flex justify-between items-center gap-x-10'>
				<div className='flex flex-col gap-y-1 text-xs'>
					<span className='uppercase opacity-[0.5] '>Ціна :</span>
					<b className=''>{price}</b>
				</div>
				{/* <button className='size-8 button' onClick={onPlus}> */}
				<img
					className={styles.plus}
					onClick={onClickPlus}
					src={isAded ? './img/btn-cheked.svg' : './img/btn-plus.svg'}
					alt='plus'
				/>
			</div>
		</div>
	)
}

export default Card
