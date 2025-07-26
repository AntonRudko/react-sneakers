import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
	return (
		<>
			<div className='wrapper '>
				<Drawer />
				<Header />
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
					<div className='flex justify-between gap-x-5'>
						<Card />
						<Card />
						<Card />
						<Card />
					</div>
				</div>
			</div>
		</>
	)
}

export default App
