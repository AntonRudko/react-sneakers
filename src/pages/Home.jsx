import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'

function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCard,
	isLoading,
}) {
	const renderItems = () => {
		// includes шукає 100% схожість
		const filteredItems = items.filter(item =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		)
		// [...Array(8)]
		return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
			<Card
				//щоб можна було розрізняти компоненти
				key={index}
				// title={item.title}
				// price={item.price}
				// imageUrl={item.imageUrl}
				// id={item.id}
				{...item}

				// або можна просто сюди передати item не витягуючи данні
				// про нього з компонента ну не робити оце: title={item.title}


				onPlus={obj => {
					onAddToCard(obj)
				}}
				onFavorite={obj => {
					onAddToFavorite(obj)
				}}
				loading={isLoading}
			/>
		))
	}

	return (
		<div className='content p-10 '>
			<div className='flex justify-between items-center mb-10'>
				<h1 className='text-3xl'>
					{searchValue ? `Пошук по запиту: ${searchValue}` : 'Всі кросівки'}
				</h1>
				<div className='search__block flex items-center'>
					<img src='./img/loupe.svg' alt='loupe' />

					<input
						onChange={onChangeSearchInput}
						type='text'
						name=''
						id=''
						value={searchValue}
						placeholder='Пошук...'
						className='input'
					/>
					{searchValue && (
						<img
							onClick={() => {
								setSearchValue('')
							}}
							src='./img/btn-remove.svg'
							alt='Clear'
							className='btn__remove--opacity mr-[-10px]'
						/>
					)}
				</div>
			</div>
			{/* flex gap-x-5 gap-y-10 flex-wrap */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
				{renderItems()}
			</div>
		</div>
	)
}
export default Home
