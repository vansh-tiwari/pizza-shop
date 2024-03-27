import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../store/actions';
import { commonStyles } from './commonStyles';

const PizzaForm = () => {
  const [type, setType] = useState('Veg');
  const [size, setSize] = useState('Medium');
  const [base, setBase] = useState('Thin');
  const [orderLimitReached, setOrderLimitReached] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    // Calculate available slots based on orders not in "Order Ready" or "Order Picked" stages
    const availableSlots =
      10 - orders.filter((order) => order.stage !== 'Order Ready' && order.stage !== 'Order Picked').length;
    setOrderLimitReached(availableSlots <= 0);
  }, [orders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderLimitReached) return;

    const order = {
      type,
      size,
      base,
      orderId: Math.floor(Math.random() * 1000),
    };
    dispatch(placeOrder(order));

    // Reset orderLimitReached after placing an order
    setOrderLimitReached(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainerStyles}>
      <div style={styles.rowStyles}>
        <label style={styles.labelStyles}>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.selectStyles}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>
      <div style={styles.rowStyles}>
        <label style={styles.labelStyles}>Size:</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} style={styles.selectStyles}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div style={styles.rowStyles}>
        <label style={styles.labelStyles}>Base:</label>
        <select value={base} onChange={(e) => setBase(e.target.value)} style={styles.selectStyles}>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </div>
      <div style={styles.rowStyles}>
        <label style={styles.labelStyles}></label>
        <button
          type="submit"
          disabled={orderLimitReached}
          style={orderLimitReached ? commonStyles.disabledButton : commonStyles.button}
        >
          Place Order
        </button>
      </div>
      {orderLimitReached && <p>Order limit reached. Please wait for available slots.</p>}
    </form>
  );
};

const styles = {
  formContainerStyles: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },

  rowStyles: {
    display: 'flex',
    marginBottom: '10px',
  },

  labelStyles: {
    flex: '1',
    marginRight: '10px',
    textAlign: 'right',
  },

  selectStyles: {
    flex: '2',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default PizzaForm;
