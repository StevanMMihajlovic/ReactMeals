import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    return <Modal onClick={props.onHideCart}>
                <ul className={styles['cart-items']}>
                    {cartCtx.items.map( x => (
                    <CartItem key={x.id}
                        onRemove={cartItemRemoveHandler.bind(null, x.id)}
                        onAdd={cartItemAddHandler.bind(null, x)}
                        name={x.name}
                        amount={x.amount}
                        price={x.price}/>))}
                </ul>
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                    {hasItems>0 && <button className={styles.button}>Order</button>}
                </div>
            </Modal>
};

export default Cart;