import React from 'react';
import styles from '@/styles/components/Card.module.css';

const Card = (props:{ date:number }) => {
  const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={styles.card}>
      <h2 className={styles.date}>{formattedDate}</h2>
    </div>
  );
};

export default Card;
