import React from 'react'
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader'
// console.log(styles)
// favorite,plus - стейти карточки коли вона додана до улюбленого і до корзини
import AppContext from '../../context'

function Card({
	title,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	id,
	loading = false,
}) {
	function onClickBtn() {
		console.log('btn was click')
	}
	const { isItemAdded, isItemFavorite } = React.useContext(AppContext)

	const onClickPlus = () => {
		onPlus({ title, price, imageUrl, id })
	}
	const onClickFavorite = () => {
		onFavorite({ title, price, imageUrl, id })
	}

	// React.useEffect(() => {
	// 	isAded
	// 		? console.log(`товар: ${title} було додано до корзини useEffect `)
	// 		: console.log(`товар: ${title} було видалено з корзини useEffect`)
	// }, [isAded])
	return (
		// 'card flex flex-col gap-y-4 relative'
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={170}
					height={226}
					viewBox='0 0 155 187'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='1' y='0' rx='10' ry='10' width='155' height='90' />
					<rect x='0' y='104' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='125' rx='5' ry='5' width='100' height='15' />
					<rect x='1' y='150' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='150' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					<div className='absolute cursor-pointer' onClick={onClickFavorite}>
						<img
							src={
								isItemFavorite(id)
									? './img/heart-like.svg'
									: './img/heart-unlike.svg'
							}
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
							src={
								isItemAdded(id) ? './img/btn-cheked.svg' : './img/btn-plus.svg'
							}
							alt='plus'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Card
