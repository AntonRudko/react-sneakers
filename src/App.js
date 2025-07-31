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
		axios
			.get('https://688b84002a52cabb9f5209b5.mockapi.io/favorites')
			.then(res => {
				setFavorites(res.data)
			})
	}, [])
	// Додали до корзини та на сервер - post
	const onAddToCard = obj => {
		console.log('товар, який додано, в КОРЗИНУ:', obj)
		console.log('ID=', obj.id)
		axios.post('https://68888338adf0e59551ba40aa.mockapi.io/cart', obj)
		setCardItems(prev => [...prev, obj])
	}
	// Видалили з корзини та з сервера
	const onRemoveItem = id => {
		console.log('---ID карточки що видалили--')
		console.log(id)
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
	// додали в список бажаного
	const onAddToFavorite = obj => {
		console.log('товар, який вподобали, в ОБРАНЕ:', obj)
		console.log('ID=', obj.id)
		if (favorites.find(favobj => favobj.id === obj.id)) {
			axios
				.delete(
					`https://688b84002a52cabb9f5209b5.mockapi.io/favorites/${obj.id}`
				)
				.then(() => {
					setFavorites(prev => prev.filter(item => item.id !== obj.id))
				})
				.catch(error => {
					console.error('Failed to delete item:', error)
				})
		} else {
			axios.post('https://688b84002a52cabb9f5209b5.mockapi.io/favorites', obj)
			setFavorites(prev => [...prev, obj])
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
