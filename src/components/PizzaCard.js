import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveToNextStage } from '../store/actions';
import { commonStyles } from './commonStyles';

export const getMakingTime = (size) => {
  switch (size) {
    case 'Small':
      return 3 * 60;
    case 'Medium':
      return 4 * 60;
    case 'Large':
      return 5 * 60;
    default:
      return 4 * 60;
  }
};

const PizzaCard = ({ order }) => {
  const dispatch = useDispatch();
  const [timeInCurrentStage, setTimeInCurrentStage] = useState(0);
  const [stageStartTime, setStageStartTime] = useState(Date.now());
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeInCurrentStage(Math.floor((Date.now() - stageStartTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [stageStartTime, timerRunning]);

  useEffect(() => {
    if (order.stage === 'Order Picked') {
      setTimerRunning(false);
    }
  }, [order.stage]);

  const handleNextStage = () => {
    dispatch(moveToNextStage(order.orderId));
    setStageStartTime(Date.now()); // Reset stage start time
  };

  const isDelayed = timeInCurrentStage > getMakingTime(order.size);
  const minutes = Math.floor(timeInCurrentStage / 60);

  return (
    <div style={isDelayed ? { ...styles.delayed, ...styles.card } : styles.card}>
      <span>Order {order.orderId}</span>
      {order.stage !== 'Order Picked' && (
        <p>
          {minutes > 0 ? `${minutes} minutes` : ''} {timeInCurrentStage % 60} seconds
        </p>
      )}
      {order.stage !== 'Order Picked' && (
        <button style={commonStyles.button} onClick={handleNextStage}>
          Next
        </button>
      )}
    </div>
  );
};

const styles = {
  delayed: {
    backgroundColor: 'red',
  },
  card: {
    width: '75%',
    alignSelf: 'center',
    padding: '10px',
    padding: '10px',
    margin: '15px',
    borderRadius: '20px',
    borderStyle: 'solid',
  },
};

export default PizzaCard;
