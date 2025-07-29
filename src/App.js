import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

import React from 'react'

function App() {
	const [items, setItems] = React.useState([])
	// стейт - масив для зберігання товарів в корзині
	const [cardItems, setCardItems] = React.useState([])
	const [cardOpened, setCardOpened] = React.useState(false)

	React.useEffect(() => {
		fetch('https://68888338adf0e59551ba40aa.mockapi.io/items')
			.then(res => {
				return res.json()
			})
			.then(json => {
				setItems(json)
			})
	}, [])

	const onAddToCard = () => {}

	return (
		<>
			<div className='wrapper '>
				{cardOpened && (
					<Drawer
						items={cardItems}
						onClose={() => {
							setCardOpened(false)
						}}
					/>
				)}
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
						{items.map(obj => (
							<Card
								key={obj.id}
								title={obj.title}
								price={obj.price}
								imageUrl={obj.imageUrl}
								onFavorite={() => console.log('Додали закладки')}
								onPlus={(obj)=>{}}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default App
