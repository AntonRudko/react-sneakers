import Card from '../components/Card'

function Favorites({ items, onAddToFavorite }) {
	return (
		<div className='content p-10 '>
			<div className='flex justify-between items-center mb-10'>
				<h1 className='text-3xl'>Мої закладки</h1>
			</div>
			{/* flex gap-x-5 gap-y-10 flex-wrap */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
				{items.map((item, index) => (
					<Card
						//щоб можна було розрізняти компоненти
						key={item.title + index}
						favorited={true}
						onFavorite={() => {
							onAddToFavorite(item)
						}}
						{...item}
						// просто передали item, деструктуризувавши його властивості
					/>
				))}
			</div>
		</div>
	)
}
export default Favorites
