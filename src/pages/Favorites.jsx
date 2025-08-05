import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'

function Favorites({}) {
	const { favorites, onAddToFavorite, onAddToCard } =
		React.useContext(AppContext)

	return (
		<div className='content p-10 '>
			<div className='mb-10'>
				
				<h1 className='text-3xl'>Мої закладки</h1>
			</div>
			{/* flex gap-x-5 gap-y-10 flex-wrap */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
				{favorites.map((item, index) => (
					<Card
						//щоб можна було розрізняти компоненти
						key={item.title + index}
						favorited={true}
						onPlus={obj => {
							onAddToCard(obj)
						}}
						onFavorite={() => {
							onAddToFavorite(item)
						}}
						{...item}
						// просто передали item, деструктуризувавши його властивості, ане витягували самостійно з item
					/>
				))}
			</div>
		</div>
	)
}
export default Favorites
