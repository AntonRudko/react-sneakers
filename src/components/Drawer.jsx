import axios from 'axios'
import React from 'react'

import Info from './Info'
import { useCard } from '../hooks/useCard'

const delay = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms)
	})

function Drawer({ onRemove, onClose, items = [] }) {
	// кастомний хук
	const { cardItems, setCardItems, totalPrice} = useCard()

	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://688b84002a52cabb9f5209b5.mockapi.io/orders',
				{ items: cardItems }
			)
			for (let i = 0; i < cardItems.length; i++) {
				const item = cardItems[i]
				await axios.delete(
					`https://68888338adf0e59551ba40aa.mockapi.io/cart/${item.id}`
				)
				await delay(1000)
			}
			setOrderId(data.id)
			setIsOrderComplete(true)
			setCardItems([])
		} catch (error) {
			alert('Виникла Помилка під час оформлення замовлення :(')
		}
		setIsLoading(false)
	}

	return (
		<div className='overlay h-screen'>
			<div className='drawer flex flex-col'>
				<h2 className='text-2xl flex justify-between items-center'>
					Корзина
					<img
						onClick={onClose}
						src='./img/btn-remove.svg'
						alt='remove'
						className='btn__remove--opacity'
					/>
				</h2>
				{items.length > 0 ? (
					<>
						<div className='items'>
							{items.map((obj, index) => (
								<div
									key={index}
									className='cart__item flex items-center gap-x-5 mt-8'
								>
									<img src={obj.imageUrl} alt='sneakers' className='size-20' />
									<div>
										<p className='mb-2 text-sm'>{obj.title}</p>
										<b className='text-base'>{obj.price}</b>
									</div>
									<img
										onClick={() => {
											onRemove(obj)
										}}
										src='./img/btn-remove.svg'
										alt='remove'
										className='btn__remove--opacity'
									/>
								</div>
							))}
						</div>
						<div className='card__total--block mt-auto'>
							<ul>
								<li className='flex justify-between gap-x-2 mb-5'>
									<span>Разом:</span>
									<div className='flex-1 border-b border-dashed border-[#DFDFDF]'></div>
									<b>{totalPrice} грн.</b>
								</li>
								<li className='flex justify-between gap-x-2 mb-5'>
									<span>Податок 5%:</span>
									<div className='flex-1 border-b border-dashed border-[#DFDFDF]'></div>
									<b>{(totalPrice * 5) / 100} грн.</b>
								</li>
							</ul>
						</div>
						<button
							disabled={isLoading}
							onClick={onClickOrder}
							className='button green__btn '
						>
							Оформити замовлення
						</button>
					</>
				) : (
					<Info
						title={isOrderComplete ? 'Замовлення оформлено!' : 'Корзина пуста'}
						description={
							isOrderComplete
								? `Ваше замовлення №${orderId} скоро буде предано в службу доставки`
								: 'Додайте хоча б одну пару кросівок, щоб зробити замовлення.'
						}
						image={
							isOrderComplete
								? './img/complete-order.png'
								: './img/empty-box.png'
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
