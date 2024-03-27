import React from 'react';
import { useSelector } from 'react-redux';
import PizzaCard from './PizzaCard';

const PizzaStages = () => {
    const orders = useSelector((state) => state.orders);

    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];

    return (
        <>
        
        <h3>Pizza Stages Section</h3>
        <div style={styles.stages}>
            {stages.map((stage) => (
                <div key={stage} style={styles.stageContainer}>
                    <h3>{stage}</h3>
                    <div style={styles.stage}>
                        {orders
                            .filter((order) => order.stage === stage).sort()
                            .map((order) => (
                                <PizzaCard key={order.orderId} order={order} /> 
                            ))}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

const styles = {
    stages: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '30px'
    },
    stage: {
        display: 'flex',
        flexDirection: 'column'
    },
    stageContainer: {
        border: '1px solid #333',
        flex: '1',
        textAlign: 'center'
    },
}

export default PizzaStages;