import Header from './components/Header'
import Drawer from './components/Drawer'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Favorites from './pages/Favorites'

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
	// для модалки
	React.useEffect(() => {
		if (cardOpened) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [cardOpened])
	// Запроси на сервер для продуктів
	React.useEffect(() => {
		// fetch('https://68888338adf0e59551ba40aa.mockapi.io/items')
		// 	.then(res => {
		// 		return res.json()
		// 	})
		// 	.then(json => {
		// 		setItems(json)
		// 	})

		async function fetchData() {
			const cardResponce = await axios.get(
				'https://68888338adf0e59551ba40aa.mockapi.io/cart'
			)

			const favoriteResponce = await axios.get(
				'https://688b84002a52cabb9f5209b5.mockapi.io/favorites'
			)
			const itemsResponce = await axios.get(
				'https://68888338adf0e59551ba40aa.mockapi.io/items'
			) // нада запитувати останнім
			setItems(itemsResponce.data)
			setCardItems(cardResponce.data)
			setFavorites(favoriteResponce.data)
		}
		fetchData()
	}, [])
	// Додали до корзини та на сервер - post
	const onAddToCard = async obj => {
		// BUG ID в home != ID в корзині проблема самої БД
		try {
			// я думаю, що тут просто можна зробити не строге порівняння ==
			if (cardItems.find(cardobj => Number(cardobj.id) === Number(obj.id))) {
				axios.delete(
					`https://68888338adf0e59551ba40aa.mockapi.io/cart/${obj.id}`
				)
				setCardItems(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				)
				console.log('цей товар вже є в корзині -> ВИДАЛЕНО')
			} else {
				const { data } = await axios.post(
					'https://68888338adf0e59551ba40aa.mockapi.io/cart',
					obj
				)
				setCardItems(prev => [...prev, data])
				console.log('товар, який додано, в КОРЗИНУ:', data)
				console.log('ID=', data.id)
			}
		} catch (error) {
			alert('Не вдалося додати до Корзини')
		}
	}
	// Видалили з корзини та з сервера
	const onRemoveItem = obj => {
		console.log('---ID карточки що видалили--')
		console.log(obj.id)
		axios
			.delete(`https://68888338adf0e59551ba40aa.mockapi.io/cart/${obj.id}`)
			.then(() => {
				setCardItems(prev => prev.filter(item => item.id !== obj.id))
			})
			.catch(error => {
				console.error('Failed to delete item:', error)
			})
	}
	// витягли пошуковий запит value з input
	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}
	// додали в список бажаного
	const onAddToFavorite = async obj => {
		try {
			console.log('товар, який вподобали, в ОБРАНЕ:', obj)
			console.log('ID=', obj.id)
			if (favorites.find(favobj => favobj.id === obj.id)) {
				axios.delete(
					`https://688b84002a52cabb9f5209b5.mockapi.io/favorites/${obj.id}`
				)
				setFavorites(prev => prev.filter(item => item.id !== obj.id))
			} else {
				const { data } = await axios.post(
					'https://688b84002a52cabb9f5209b5.mockapi.io/favorites',
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не вдалося додати до обраного')
		}
	}
	return (
		<>
			<div className='wrapper '>
				{cardOpened && (
					<Drawer
						onRemove={id => {
							onRemoveItem(id)
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
				{/* exact - тільки тоді коли роут строго співпада то рендери...*/}
				<Routes>
					<Route
						path='favorites'
						element={
							<Favorites
								items={favorites}
								onAddToFavorite={onAddToFavorite}
								onAddToCard={onAddToCard}
							/>
						}
						exact
					/>
					<Route
						index
						element={
							<Home
								cardItems={cardItems}
								items={items}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCard={onAddToCard}
							/>
						}
						exact
					/>
					{/* <Route path='*' element={<Favorites />} exact /> */}
				</Routes>
			</div>
		</>
	)
}
export default App
