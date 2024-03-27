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
        <div className="main-section">
            <h3>Orders in Progress</h3>
            <table>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Stage</th>
                        <th>Total time spent (time from order placed)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersInProgress.map((order) => {
                        const totalTimeSpent = calculateTotalTimeSpent(order);
                        const minutes = Math.floor(totalTimeSpent / (1000 * 60));
                        const seconds = Math.floor((totalTimeSpent % (1000 * 60)) / 1000);
    
                        return (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.stage}</td>
                                <td>{minutes} min {seconds} sec</td>
                                <td>
                                    {order.stage !== 'Order Picked' && (
                                        <button onClick={() => handleNextStage(order.orderId)}>
                                            Next Stage
                                        </button>
                                    )}
                                    {(order.stage !== 'Order Picked' || order.stage !== 'Order Ready') && (
                                        <button onClick={() => handleCancel(order.orderId)}>
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <table>
                <tr>
                    <td>Total order delivered:</td>
                    <td>
                        {ordersPicked.map((order, index) => (
                            <span key={order.orderId}>
                                {index > 0 && ', '}
                                {order.orderId}
                            </span>
                        ))}
                    </td>
                </tr>
            </table>
        </div>
    );
    
};

export default MainSection;