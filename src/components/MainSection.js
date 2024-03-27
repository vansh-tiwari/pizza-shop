import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveToNextStage, cancelOrder } from '../store/actions';

const MainSection = () => {
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();

    const handleNextStage = (orderId) => {
        dispatch(moveToNextStage(orderId));
    };

    const handleCancel = (orderId) => {
        dispatch(cancelOrder(orderId));
    };

    // Calculate total time spent for each order
    const calculateTotalTimeSpent = (order) => {
        let totalTime = 0;
        const stageStartTimes = order.stageStartTimes || {}; // Assuming you have stageStartTimes in your order data
        for (const stage in stageStartTimes) {
            if (stageStartTimes[stage]) {
                totalTime += Date.now() - stageStartTimes[stage];
            }
        }
        return totalTime;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update time spent for each order in the store
            dispatch({
                type: 'UPDATE_TIME_SPENT',
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const ordersInProgress = orders.filter((order) => order.stage !== 'Order Picked');
    const ordersPicked = orders.filter((order) => order.stage === 'Order Picked');

    return (
        <div>
            <h3>Main Section</h3>
            <table style={styles.tableStyle}>
                <thead>
                    <tr>
                        <th style={styles.cellStyle}>Order Id</th>
                        <th style={styles.cellStyle}>Stage</th>
                        <th style={styles.cellStyle}>Total time spent (time from order placed)</th>
                        <th style={styles.cellStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersInProgress.map((order) => {
                        const totalTimeSpent = calculateTotalTimeSpent(order);
                        const minutes = Math.floor(totalTimeSpent / (1000 * 60));
                        const seconds = Math.floor((totalTimeSpent % (1000 * 60)) / 1000);
    
                        return (
                            <tr key={order.orderId}>
                                <td style={styles.cellStyle}>{order.orderId}</td>
                                <td style={styles.cellStyle}>{order.stage}</td>
                                <td style={styles.cellStyle}>{minutes} min {seconds} sec</td>
                                <td style={styles.cellStyle}>
                                    {(order.stage !== 'Order Picked' || order.stage !== 'Order Ready') && (
                                        <button onClick={() => handleCancel(order.orderId)}>
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                     <td style={styles.cellStyle}>Total order delivered:</td>
                    <td style={styles.cellStyle} colSpan={3}>
                        {ordersPicked.map((order, index) => (
                            <span key={order.orderId}>
                                {index > 0 && ', '}
                                {order.orderId}
                            </span>
                        ))}
                    </td>
                </tbody>
            </table>
        </div>
    );
    
};

const styles = {
    tableStyle: {
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid black'
    },
    
    cellStyle: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center'
    },
}

export default MainSection;