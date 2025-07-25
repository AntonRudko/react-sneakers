function App() {
	return (
		<>
			<div className='wrapper '>
				<div className='overlay'>
					<div className='drawer flex flex-col'>
						<h2 className='text-2xl flex justify-between items-center'>
							Корзина
							<img
								src='./img/btn-remove.svg'
								alt='remove'
								className='btn__remove--opacity'
							/>
						</h2>

						<div className='items'>
							<div className='cart__item flex items-center gap-x-5 mt-8'>
								<img
									src='./img/sneakers/1.jpg'
									alt='sneakers'
									className='size-20'
								/>
								<div>
									<p className='mb-2 text-sm'>
										Чоловічі Кросівки Nike Air Max 270
									</p>
									<b className='text-base'>12 999 грн.</b>
								</div>
								<img
									src='./img/btn-remove.svg'
									alt='remove'
									className='btn__remove--opacity'
								/>
							</div>
							<div className='cart__item flex items-center gap-x-5 mt-8'>
								<img
									src='./img/sneakers/2.jpg'
									alt='sneakers'
									className='size-20'
								/>
								<div>
									<p className='mb-2 text-sm'>
										Чоловічі Кросівки Nike Air Max 270
									</p>
									<b className='text-base'>12 999 грн.</b>
								</div>
								<img
									src='./img/btn-remove.svg'
									alt='remove'
									className='btn__remove--opacity'
								/>
							</div>
							
							
							
							
							
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
				<header className='flex justify-between  text-[#5C5C5C] items-center p-10 border-solid border-b-2 border-[#EAEAEA]'>
					<div className='flex items-center gap-x-4'>
						<img className='size-10' src='/img/logo.svg' alt='logo' />
						<div>
							<h3 className='text-[#000]'>REACT SNEAKERS</h3>
							<p className='opacity-[0.5]'>Магазин найкращих кросівок</p>
						</div>
					</div>

					<ul className='flex gap-x-8'>
						<li>
							<img className='size-4 mr-3' src='/img/basket.svg' alt='basket' />
							<span>1205 грн.</span>
						</li>
						<li>
							<img className='size-4 mr-3' src='/img/user.svg' alt='user' />
							<span>Профіль</span>
						</li>
					</ul>
				</header>
				<div className='content p-10'>
					<div className='flex justify-between items-center mb-10'>
						<h1>Всі кросівки</h1>
						<div className='search__block flex items-center'>
							<img src='./img/loupe.svg' alt='loupe' />
							<input
								type='text'
								name=''
								id=''
								placeholder='Пошук...'
								className='input'
							/>
						</div>
					</div>
					<div className='card flex flex-col gap-y-4 relative'>
						<div className='absolute cursor-pointer'>
							<img
								src='./img/heart-unlike.svg'
								alt='unlike'
								className='size-8 '
							/>
						</div>
						<div className='text-center'>
							<img
								className='size-28 mb-3 '
								src='./img/sneakers/1.jpg'
								alt='sneakers'
							/>
						</div>

						<h5 className='card__text text-sm font-normal'>
							Чоловічі Кросівки Nike Blazer Mid Suede
						</h5>
						<div className='flex justify-between items-center gap-x-10'>
							<div className='flex flex-col gap-y-1 text-xs'>
								<span className='uppercase opacity-[0.5] '>Ціна :</span>
								<b className=''>12 999 грн.</b>
							</div>
							<button className='size-8 button'>
								<img src='./img/plus.svg' alt='plus' className='size-3' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
