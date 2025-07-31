function Drawer({ onRemove, onClose, items = [] }) {
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
											onRemove(obj.id)
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
					</>
				) : (
					<div className='flex flex-col items-center mt-auto mb-auto'>
						<img src='./img/empty-box.png' alt='box' className='size-32 mb-5' />
						<p className='text-2xl font-semibold mb-2 '>Корзина пуста</p>
						<p className='text-center opacity-40 max-w-72 mb-10'>
							Додайте хоча б одну пару кросівок, щоб зробити замовлення.
						</p>

						<button className='button green__btn--empty ' onClick={onClose}>
							Повернутися назад
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Drawer
