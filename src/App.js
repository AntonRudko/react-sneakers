import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

import axios from 'axios'
import React from 'react'

function App() {
	// карточки що є насторінці
	const [items, setItems] = React.useState([])
	// стейт - масив для зберігання товарів в корзині
	const [cardItems, setCardItems] = React.useState([])
	// стейт для пошуку через інпут
	const [searchValue, setSearchValue] = React.useState('')
	// чи відкрита корзина ?
	const [cardOpened, setCardOpened] = React.useState(false)
	// масив бажаних товарів
	const [favorites, setFavorites] = React.useState([])

	// спроба нормлаьно зробити модалку з корзиною
	React.useEffect(() => {
		if (cardOpened) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [cardOpened])

	// Запроси на сервер
	React.useEffect(() => {
		// fetch('https://68888338adf0e59551ba40aa.mockapi.io/items')
		// 	.then(res => {
		// 		return res.json()
		// 	})
		// 	.then(json => {
		// 		setItems(json)
		// 	})
		axios.get('https://68888338adf0e59551ba40aa.mockapi.io/items').then(res => {
			setItems(res.data)
		})
		axios.get('https://68888338adf0e59551ba40aa.mockapi.io/cart').then(res => {
			setCardItems(res.data)
		})
	}, [])
	// Додали до корзини та на сервер - post
	const onAddToCard = obj => {
		axios.post('https://68888338adf0e59551ba40aa.mockapi.io/cart', obj)
		setCardItems(prev => [...prev, obj])
	}
	// Видалили з корзини та з сервера
	const onRemoveItem = id => {
		axios
			.delete(`https://68888338adf0e59551ba40aa.mockapi.io/cart/${id}`)
			.then(() => {
				setCardItems(prev => prev.filter(item => item.id !== id))
			})
			.catch(error => {
				console.error('Failed to delete item:', error)
			})
	}
	// витягли пошуковий запит value з input
	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}
	// додали в список бажаного та на сервер
	// нажаль сервіс mockapi - не дозволив створити таблицю Favorite тобу вибране = корзина
	const onAddFavorite = obj => {
		axios.post('https://68888338adf0e59551ba40aa.mockapi.io/cart', obj)
		setFavorites(prev => [...prev, obj])
	}

	return (
		<>
			<div className='wrapper '>
				{cardOpened && (
					<Drawer
						onRemove={id => {
							onRemoveItem(id)
							console.log('---ID карточки що видалили--')
							console.log(id)
						}}
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
				<div className='content p-10 '>
					<div className='flex justify-between items-center mb-10'>
						<h1>
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
						{items
							// includes шукає 100% схожість
							.filter(item =>
								item.title.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map((item, index) => (
								<Card
									//щоб можна було розрізняти компоненти
									key={item.title + index}
									title={item.title}
									price={item.price}
									imageUrl={item.imageUrl}
									onFavorite={obj => {
										onAddFavorite(obj)
									}}
									// або можна просто сюди передати item не витягуючи данні
									// про нього з компонента
									onPlus={obj => {
										onAddToCard(obj)
										console.log(item)
									}}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	)
}

export default App
