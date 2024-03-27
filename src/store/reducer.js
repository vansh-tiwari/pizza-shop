import {PLACE_ORDER, MOVE_TO_NEXT_STAGE, CANCEL_ORDER} from './actions';

const initialState = {
  orders: [],
  totalDelivered: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case PLACE_ORDER:
          return {
              ...state,
              orders: [
                  ...state.orders,
                  {
                      ...action.payload,
                      stage: 'Order Placed',
                      timeSpent: 0,
                  },
              ],
          };
      case MOVE_TO_NEXT_STAGE:
          return {
              ...state,
              orders: state.orders.map((order) => {
                  if (order.orderId === action.payload) {
                      const nextStage = getNextStage(order.stage);
                      return {
                          ...order,
                          stage: nextStage,
                      };
                  }
                  return order;
              }),
          };
      case CANCEL_ORDER:
          return {
              ...state,
              orders: state.orders.filter((order) => order.orderId !== action.payload),
          };
      default:
          return state;
  }
};

const getNextStage = (currentStage) => {
  switch (currentStage) {
      case 'Order Placed':
          return 'Order in Making';
      case 'Order in Making':
          return 'Order Ready';
      case 'Order Ready':
          return 'Order Picked';
      default:
          return currentStage;
  }
};

export default reducer;