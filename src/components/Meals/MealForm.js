import styles from './MealForm.module.css';
import Input from '../UI/Input';
import { useRef, useState } from 'react';

const MealForm = (props) => {
    const [isValid, setValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;

        if(enteredAmount.trim() === '' || +enteredAmount < 1 || +enteredAmount > 5){
            setValid(false);
            return;
        }
        props.onAddtoCart(+enteredAmount);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input label="Amount"
                ref={amountInputRef} 
                input={{
                    id: 'amount' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '0'
                }
                }/>
            <button>Add</button>
            {!isValid && <p>Please enter a valid amount (1-5)!</p>}
        </form>
    );
};

export default MealForm;