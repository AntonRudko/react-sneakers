import React from 'react'
import Card from '../components/Card'
import { Empty } from '../components/Empty'
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
			{favorites.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
					{favorites.map((item, index) => (
						<Card
							//щоб можна було розрізняти компоненти
							key={index}
							favorited={item.id}
							onPlus={obj => {
								onAddToCard(obj)
							}}
							onFavorite={() => {
								onAddToFavorite(item)
							}}
							// id={item.parentId}
							// // я аля переприсвоїв ID
							// imageUrl={item.imageUrl}
							// price={item.price}
							// title={item.title}
							{...item}
							// просто передали item, деструктуризувавши його властивості, ане витягували самостійно з item
						/>
					))}
				</div>
			) : (
				<Empty
					smile='./img/smile2.png'
					description='У вас немає збережених'
					text='Тут будуть відображені всі ваші збережені товари'
				/>
			)}
		</div>
	)
}
export default Favorites
