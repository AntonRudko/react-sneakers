import React from 'react'
import styles from './Card.module.scss'
// console.log(styles)
// favorite,plus - стейти карточки коли вона додана до улюбленого і до корзини
function Card({
	title,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	id,
	favorited = false,
	added = false,
}) {
	function onClickBtn() {
		console.log('btn was click')
	}

	const [isAded, setIsAded] = React.useState(added)
	const [isFavorite, setIsFavorite] = React.useState(favorited)

	const onClickPlus = () => {
		onPlus({ title, price, imageUrl, id })
		setIsAded(!isAded)
	}
	const onClickFavorite = () => {
		onFavorite({ title, price, imageUrl, id })
		setIsFavorite(!isFavorite)
	}

	// React.useEffect(() => {
	// 	isAded
	// 		? console.log(`товар: ${title} було додано до корзини useEffect `)
	// 		: console.log(`товар: ${title} було видалено з корзини useEffect`)
	// }, [isAded])
	return (
		// 'card flex flex-col gap-y-4 relative'
		<div className={styles.card}>
			<div className='absolute cursor-pointer' onClick={onClickFavorite}>
				<img
					src={isFavorite ? './img/heart-like.svg' : './img/heart-unlike.svg'}
					alt='unlike'
					className='size-8 '
				/>
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
