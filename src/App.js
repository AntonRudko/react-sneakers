function App() {
	return (
		<div className='wrapper'>
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
				<h1 className='mb-10'>Всі кросівки</h1>
				<div className='card flex flex-col gap-y-4 '>
					<img
						className='size-28 mb-3 text-center'
						src='./img/sneakers/1.jpg'
						alt='sneakers'
					/>

					<h5 className='card__text'>
						Чоловічі Кросівки Nike Blazer Mid Suede
					</h5>
					<div className='flex justify-between items-center gap-x-10'>
						<div className='flex flex-col gap-y-1 text-xs'>
							<span className='uppercase opacity-[0.5] '>Ціна :</span>
							<b className=''>12 999 грн.</b>
						</div>
						<button className='button'>
							<img src='./img/plus.svg' alt='plus' className='size-3' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
