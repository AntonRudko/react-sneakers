import axios from 'axios'
import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'

function Orders({}) {
	const { onAddToCard, onAddToFavorite } = React.useContext(AppContext)
	const [orders, setOrders] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://688b84002a52cabb9f5209b5.mockapi.io/orders'
				)
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setIsLoading(false)
			} catch (error) {
				alert('Помилка під час завантаження...')
			}
		})()
	}, [])

	return (
		<div className='content p-10 '>
			<div className='mb-10'>
				<h1 className='text-3xl'>Мої покупки</h1>
			</div>
			{/* flex gap-x-5 gap-y-10 flex-wrap */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<Card key={index} {...item} loading={isLoading} />
				))}
			</div>
		</div>
	)
}
export default Orders
