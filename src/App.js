import { Route, Routes } from 'react-router-dom'
import Drawer from './components/Drawer'
import Header from './components/Header'
import AppContext from './context'

import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'

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

	// для карточок, коли вони ще не завантажилися з бекенду ?
	const [isLoading, setIsLoading] = React.useState(true)

	// для модалки
	React.useEffect(() => {
		if (cardOpened) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}, [cardOpened])
	// Запроси на сервер для продуктів
	// useEffect - не може бути асинхронною функцією тому треба створювати всередині функцію
	// fetch('https://68888338adf0e59551ba40aa.mockapi.io/items')
	// 	.then(res => {
	// 		return res.json()
	// 	})
	// 	.then(json => {
	// 		setItems(json)
	// 	})
	React.useEffect(() => {
		async function fetchData() {
			// якщо функція більше одного разу виконується
			try {
				setIsLoading(true)

				const [cardResponce, favoriteResponce, itemsResponce] =
					await Promise.all([
						axios.get('https://68888338adf0e59551ba40aa.mockapi.io/cart'),
						axios.get('https://688b84002a52cabb9f5209b5.mockapi.io/favorites'),
						axios.get('https://68888338adf0e59551ba40aa.mockapi.io/items'),
					])
				setIsLoading(false)
				setItems(itemsResponce.data)
				setCardItems(cardResponce.data)
				setFavorites(favoriteResponce.data)
			} catch (error) {
				alert('Виникла помилка під час завантаження данних!')
				console.error(error)
			}
		}
		fetchData()
	}, [])
	// Додали до корзини та на сервер - post
	const onAddToCard = async obj => {
		// BUG ID в home != ID в корзині проблема самої БД
		// fix - додати parrent-ID в БД
		try {
			const findItem = cardItems.find(
				cardobj => Number(cardobj.parentId) === Number(obj.id)
			)
			// я думаю, що тут просто можна зробити не строге порівняння ==
			if (findItem) {
				axios.delete(
					`https://68888338adf0e59551ba40aa.mockapi.io/cart/${findItem.id}`
				)
				setCardItems(prev =>
					prev.filter(item => Number(item.parentId) !== Number(obj.id))
				)
				console.log('цей товар вже є в корзині -> ВИДАЛЕНО', obj.id)
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
			console.error(error)
		}
	}
	// Видалили з корзини та з сервера
	// parent-ID
	const onRemoveItem = async obj => {
		try {
			console.log('---ID карточки що видалили-- ' + obj.id)
			axios
				.delete(`https://68888338adf0e59551ba40aa.mockapi.io/cart/${obj.id}`)
				.then(() => {
					setCardItems(prev =>
						prev.filter(item => Number(item.id) !== Number(obj.id))
					)
				})
				.catch(error => {
					console.error('Failed to delete item:', error)
				})
		} catch (error) {
			alert('Не вдалося видалити з Корзини')
			console.error(error)
		}
	}
	// додали в список бажаного
	const onAddToFavorite = async obj => {
		try {
			console.log('товар, який додали, в ОБРАНЕ:', obj)
			console.log('ID=', obj.id)
			if (favorites.find(favobj => Number(favobj.id) === Number(obj.id))) {
				axios.delete(
					`https://688b84002a52cabb9f5209b5.mockapi.io/favorites/${obj.id}`
				)
				setFavorites(prev => prev.filter(item => item.id !== obj.id))
				console.log('цей товар вже є в обраному -> ВИДАЛЕНО', obj.id)
			} else {
				const { data } = await axios.post(
					'https://688b84002a52cabb9f5209b5.mockapi.io/favorites',
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не вдалося додати до обраного')
			console.error(error)
		}
	}
	// витягли пошуковий запит value з input
	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}
	// функція що чекає чи є товар в корзині ?
	const isItemAdded = id => {
		return cardItems.some(obj => Number(obj.parentId) === Number(id))
	}

	// find - повертає обʼкт абож undef some
	const isItemFavorite = id => {
		return favorites.some(obj => Number(obj.parentId) === Number(id))
	}

	return (
		// весь код в який всередині AppContext.Provider знає, що лежить в AppContext
		<AppContext.Provider
			value={{
				cardItems,
				favorites,
				items,
				isItemAdded,
				isItemFavorite,
				onAddToFavorite,
				setCardOpened,
				setCardItems,
				onAddToCard,
			}}
		>
			<div className='wrapper '>
				<Drawer
					onRemove={id => {
						onRemoveItem(id)
					}}
					items={cardItems}
					onClose={() => {
						setCardOpened(false)
					}}
					opened={cardOpened}
				/>

				<Header
					onClickCard={() => {
						setCardOpened(true)
					}}
				/>
				{/* exact - тільки тоді коли роут строго співпада то рендери...*/}
				<Routes>
					<Route
						path='favorites'
						element={<Favorites onAddToCard={onAddToCard} />}
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
								isLoading={isLoading}
								favorites={favorites}
							/>
						}
						exact
					/>
					<Route path='orders' element={<Orders />} />
					{/* <Route path='*' element={<Favorites />} exact /> */}
				</Routes>
			</div>
		</AppContext.Provider>
	)
}
export default App
