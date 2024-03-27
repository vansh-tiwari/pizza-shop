import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { moveToNextStage } from '../store/actions';

const PizzaCard = ({ order }) => {
    const dispatch = useDispatch();
    const [timeSpent, setTimeSpent] = useState(order.timeSpent || 0); // Initialize timeSpent
    const [timeInCurrentStage, setTimeInCurrentStage] = useState(0);
    const [stageStartTime, setStageStartTime] = useState(Date.now()); // Track stage start time

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Calculate time in current stage
            setTimeInCurrentStage(Math.floor((Date.now() - stageStartTime) / 1000));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [stageStartTime]); // Only update when stageStartTime changes

    useEffect(() => {
        const makingTime = getMakingTime(order.size);
        if (timeSpent >= makingTime && order.stage !== 'Order Picked') {
            dispatch(moveToNextStage(order.orderId));
            setTimeSpent((prevTimeSpent) => prevTimeSpent + timeInCurrentStage); // Update timeSpent
            setTimeInCurrentStage(0); // Reset time in current stage
            setStageStartTime(Date.now()); // Update stage start time
        }
    }, [timeSpent, order.size, order.stage, order.orderId, dispatch, timeInCurrentStage]);

    const getMakingTime = (size) => {
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

    const handleNextStage = () => {
        dispatch(moveToNextStage(order.orderId));
    };

    // Highlight card if in the same stage for more than 3 minutes
    const isDelayed = timeInCurrentStage > 180;

    return (
        <div style={isDelayed ? styles.delayed : {}}>
            <p>Order {order.orderId}</p>
            {order.stage !== 'Order Picked' && (
                <p>{Math.floor(timeInCurrentStage / 60)} minutes {timeInCurrentStage % 60} seconds</p>
            )}
            {order.stage !== 'Order Picked' && (
                <button onClick={handleNextStage}>Next Stage</button>
            )}
        </div>
    );
};

const styles = {
    delayed: {
        backgroundColor: 'red'
    }
}

export default PizzaCard;

