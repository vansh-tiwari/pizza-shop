export const PLACE_ORDER = 'PLACE_ORDER';
export const MOVE_TO_NEXT_STAGE = 'MOVE_TO_NEXT_STAGE';
export const CANCEL_ORDER = 'CANCEL_ORDER';

export const placeOrder = (order) => ({
  type: PLACE_ORDER,
  payload: order,
});

export const moveToNextStage = (orderId) => ({
  type: MOVE_TO_NEXT_STAGE,
  payload: orderId,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});
