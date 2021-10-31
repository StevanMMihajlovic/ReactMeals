import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = (props) => {
    const [bump, setBump] = useState(false);
    const cartCtx = useContext(CartContext);

    const cartAmount = cartCtx.items.reduce((preVal, item) => {
        return preVal + item.amount;
    }, 0);

    const btnClass = `${styles.button} ${bump ? styles.bump : ''}`;

    useEffect(() => {
        if (cartCtx.items.length === 0){
            return;
        }
        setBump(true);
        const timer = setTimeout(()=>{
            setBump(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    return <button className={btnClass} onClick={props.onClick}>
                <span className={styles.icon}>
                    <CartIcon/>
                </span>
                <span>Your Cart</span>
                <span className={styles.badge}>{cartAmount}</span>
            </button>
};

export default HeaderCartButton;