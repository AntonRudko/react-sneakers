import { Link } from 'react-router-dom'

function Header(props) {
	return (
		<header className='flex justify-between  text-[#5C5C5C] items-center p-10 border-solid border-b-2 border-[#EAEAEA]'>
			<Link className='no-underline text-inherit' to='/'>
				<div className='flex items-center gap-x-4'>
					<img className='size-10' src='/img/logo.svg' alt='logo' />
					<div>
						<h3 className='text-[#000]'>REACT SNEAKERS</h3>
						<p className='opacity-[0.5]'>Магазин найкращих кросівок</p>
					</div>
				</div>
			</Link>

			<ul className='flex gap-x-8 '>
				<li className='cursor-pointer' onClick={props.onClickCard}>
					<img className='size-4 mr-3 ' src='/img/basket.svg' alt='basket' />
					<span>1205 грн.</span>
				</li>
				<li className='cursor-pointer'>
					<Link className='no-underline text-inherit' to='/favorites'>
						<img
							className='size-4 mr-3 '
							src='/img/favorites.svg'
							alt='heart'
						/>
						<span>Вибране</span>
					</Link>
				</li>
				<li className='cursor-pointer'>
					<img className='size-4 mr-3 ' src='/img/user.svg' alt='user' />
					<span>Профіль</span>
				</li>
			</ul>
		</header>
	)
}

export default Header
