import React from 'react';
import { useSelector } from 'react-redux';
import PizzaCard from './PizzaCard';

const PizzaStages = () => {
    const orders = useSelector((state) => state.orders);

    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];

    return (
        <div style={styles.stages}>
            {stages.map((stage, index) => (
                <div key={stage} style={index === stages.length - 1 ? styles.stageContainer : {...styles.stageContainer, borderRight: '1px solid #ccc'}}>
                    <h3>{stage}</h3>
                    <div style={styles.stage}>
                        {orders
                            .filter((order) => order.stage === stage)
                            .map((order) => (
                                <PizzaCard key={order.orderId} order={order} /> 
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    stages: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    stage: {
        display: 'flex',
        flexDirection: 'column'
    },
    stageContainer: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px'
    },
}

export default PizzaStages;