import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

import React from 'react'

const arr = [
	{
		title: 'Чоловічі Кросівки Nike Blazer Mid Suede',
		price: 12999,
		imageUrl: './img/sneakers/1.jpg',
	},
	{
		title: 'Чоловічі Кросівки Nike Air Max 270',
		price: 15600,
		imageUrl: './img/sneakers/2.jpg',
	},
	{
		title: 'Чоловічі Кросівки Nike Blazer Mid Suede',
		price: 8499,
		imageUrl: './img/sneakers/3.jpg',
	},
	{
		title: 'Кросівки Puma X Aka Boku Future Rider',
		price: 8999,
		imageUrl: './img/sneakers/4.jpg',
	},
	{
		title: 'Чоловічі Кросівки Under Armour Curry 8',
		price: 15199,
		imageUrl: './img/sneakers/5.jpg',
	},
	{
		title: 'Чоловічі Кросівки Nike Kyrie 7',
		price: 11299,
		imageUrl: './img/sneakers/6.jpg',
	},
]

function App() {
	const [cardOpened, setCardOpened] = React.useState(false)

	return (
		<>
			<div className='wrapper '>
				{cardOpened ? <Drawer /> : null}
				<Header
					onClickCard={() => {
						setCardOpened(true)
					}}
				/>
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
					{/* flex gap-x-5 gap-y-10 flex-wrap */}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
						{arr.map(obj => (
							<Card
								title={obj.title}
								price={obj.price}
								imageUrl={obj.imageUrl}
								onFavorite={() => console.log('Додали закладки')}
								onPlus={() => console.log('Нажали +')}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default App
