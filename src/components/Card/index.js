import styles from './Card.module.scss'
console.log(styles)

function Card(props) {

	return (
		// 'card flex flex-col gap-y-4 relative'
		<div className={styles.card}>
			<div className='absolute cursor-pointer'>
				<img src='./img/heart-unlike.svg' alt='unlike' className='size-8 ' />
			</div>
			<div className='text-center'>
				<img className='size-28 mb-3 ' src={props.imageUrl} alt='sneakers' />
			</div>

			<h5 className='card__text text-sm font-normal min-h-16'>{props.title}</h5>
			<div className='flex justify-between items-center gap-x-10'>
				<div className='flex flex-col gap-y-1 text-xs'>
					<span className='uppercase opacity-[0.5] '>Ціна :</span>
					<b className=''>{props.price}</b>
				</div>
				<button className='size-8 button' onClick={props.onClick}>
					<img src='./img/plus.svg' alt='plus' className='size-3' />
				</button>
			</div>
		</div>
	)
}

export default Card
