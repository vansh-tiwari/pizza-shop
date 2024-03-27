import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../store/actions';

const PizzaForm = () => {
    const [type, setType] = useState('Veg');
    const [size, setSize] = useState('Medium');
    const [base, setBase] = useState('Thin');
    const [orderLimitReached, setOrderLimitReached] = useState(false);

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);

    useEffect(() => {
        // Calculate available slots based on orders not in "Order Ready" or "Order Picked" stages
        const availableSlots = 10 - orders.filter((order) => order.stage !== 'Order Ready' && order.stage !== 'Order Picked').length;
        setOrderLimitReached(availableSlots <= 0);
    }, [orders]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderLimitReached) {
            // Display error message if order limit is reached
            return;
        }
        const order = {
            type,
            size,
            base,
            orderId: Math.floor(Math.random() * 1000), // Generate random order ID
        };
        dispatch(placeOrder(order));

        // Reset orderLimitReached after placing an order
        setOrderLimitReached(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </select>
            </label>
            <label>
                Size:
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </label>
            <label>
                Base:
                <select value={base} onChange={(e) => setBase(e.target.value)}>
                    <option value="Thin">Thin</option>
                    <option value="Thick">Thick</option>
                </select>
            </label>
            
            <button type="submit" disabled={orderLimitReached}>
                Place Order
            </button>
            {orderLimitReached && <p>Order limit reached. Please wait for available slots.</p>}
        </form>
    );
};

export default PizzaForm;