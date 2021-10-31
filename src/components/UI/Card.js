import React from "react";
import styles from './Card.module.css'

const Card = props => {
    const newClass = `${styles.card} ${props.className}`;
    return (
        <div className={newClass}>{props.children}</div>
    );
};

export default Card;