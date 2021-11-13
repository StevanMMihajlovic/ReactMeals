import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

import React, { useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const baseURL_FB =
    "https://pragmatic-star-317122-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

  const transformMeals = useCallback((data) => {
    const myMeals = [];
    for (let i in data) {
      myMeals.push({
        id: i,
        name: data[i].name,
        description: data[i].description,
        price: data[i].price,
      });
    }
    setMeals(myMeals);
  }, []);

  const { load, error, getMeals } = useHttp(
    { url: baseURL_FB },
    transformMeals
  );

  useEffect(() => {
    getMeals();
  }, []);

  let content = <p>No meals found.</p>;

  if (error) {
    content = <p>{error}</p>;
  }
  if (!load && meals.length > 0) {
    content = (
      <ul>
        {meals.map((x) => (
          <MealItem key={x.id} meal={x}></MealItem>
        ))}
      </ul>
    );
  }

  if (!load && meals.length === 0 && !error) {
    content = <p>No meals found.</p>;
  }

  if (load) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
