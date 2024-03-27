import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { moveToNextStage } from '../store/actions';
import { commonStyles } from './commonStyles';

const PizzaCard = ({ order }) => {
    const dispatch = useDispatch();
    const [timeInCurrentStage, setTimeInCurrentStage] = useState(0);
    const [stageStartTime, setStageStartTime] = useState(Date.now());
    const [timerRunning, setTimerRunning] = useState(true); // New state to control timer

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
            setTimerRunning(false); // Stop timer when order is picked
        }
    }, [order.stage]);

    // Removed the useEffect hook that was triggering automatic stage progression

    const getMakingTime = (size) => {
        switch (size) {
            case 'Small':
                return 3 * 1;
            case 'Medium':
                return 4 * 1;
            case 'Large':
                return 5 * 1;
            default:
                return 4 * 1;
        }
    };

    const handleNextStage = () => {
        dispatch(moveToNextStage(order.orderId));
        setStageStartTime(Date.now()); // Reset stage start time
    };

    // Highlight card if in the same stage for more than 3 minutes
    const isDelayed = timeInCurrentStage > getMakingTime(order.size);

    return (
        <div style={isDelayed ? {...styles.delayed, ...styles.card} : styles.card}>
            <span>Order {order.orderId}</span>
            {order.stage !== 'Order Picked' && (
                <p>{Math.floor(timeInCurrentStage / 60)} minutes {timeInCurrentStage % 60} seconds</p>
            )}
            {order.stage !== 'Order Picked' && (
                <button style={commonStyles.button} onClick={handleNextStage}>Next</button>
            )}
        </div>
    );
};

const styles = {
    delayed: {
        backgroundColor: 'red'
    },
    card: {
        width: '75%',
        alignSelf: 'center',
        padding: '10px',
        padding: '10px',
        margin: '15px',
        borderRadius: '20px',
        borderStyle: 'solid'
    }
}

export default PizzaCard;