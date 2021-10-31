import styles from './MealItem.module.css';
import MealForm from './MealForm';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (newAmount) => {
        cartCtx.addItem({
            id: props.meal.id,
            name: props.meal.name,
            amount: newAmount,
            price: props.meal.price
        })
    };

    return  <li  className={styles.meal} key={props.meal.id}>
                <div>
                    <h3>{props.meal.name}</h3>
                    <div className={styles.description}>{props.meal.description}</div>
                    <div className={styles.price}>${props.meal.price.toFixed(2)}</div>
                </div>
                <div>
                    <MealForm onAddtoCart={addToCartHandler} id={props.meal.id}/>
                </div>
            </li>
};

export default MealItem;