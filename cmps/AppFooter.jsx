import { TOGGLE_CART } from '../store/store.js'

const { useSelector, useDispatch } = ReactRedux

export function AppFooter() {
	// TODO: move to store state
	const count = useSelector(state => state.count)
	const showCart = useSelector(state => state.showCart)
	const carsCount = useSelector(state => state.cars.length)
	const dispatch = useDispatch()

	const cart = useSelector(state=> state.cart)

	return (
		<footer className="app-footer">
			<section className="cart-stats">
				<p>{carsCount} cars in the shop</p>
				<p className="product-count">{cart.length} products in your Cart</p>
				<button onClick={() => dispatch({ type: TOGGLE_CART })}>{showCart ? 'hide 🛒' : 'show 🛒'}</button>
			</section>
			<p>Coffeerights &copy; 2024 - Count: {count}</p>
		</footer>
	)
}
