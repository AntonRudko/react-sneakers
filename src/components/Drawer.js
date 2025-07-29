function Drawer({ onClose, items = [] }) {
	return (
		<div className='overlay '>
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

				<div className='items'>
					{items.map(obj => (
						<div className='cart__item flex items-center gap-x-5 mt-8'>
							<img src={obj.imageUrl} alt='sneakers' className='size-20' />
							<div>
								<p className='mb-2 text-sm'>{obj.title}</p>
								<b className='text-base'>{obj.price}</b>
							</div>
							<img
								src='./img/btn-remove.svg'
								alt='clouse'
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
							<b>21 498 грн.</b>
						</li>
						<li className='flex justify-between gap-x-2 mb-5'>
							<span>Податок 5%:</span>
							<div className='flex-1 border-b border-dashed border-[#DFDFDF]'></div>
							<b>1074 грн.</b>
						</li>
					</ul>
				</div>
				<button className='button green__btn '>Оформити замовлення</button>
			</div>
		</div>
	)
}

export default Drawer
